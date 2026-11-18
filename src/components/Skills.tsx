import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import * as THREE from 'three';
import { skills } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface HoveredSkillInfo {
  name: string;
  iconClass: string;
  x: number;
  y: number;
}

export function Skills(): JSX.Element {
  const reduceMotion = usePrefersReducedMotion();
  const [hoveredSkill, setHoveredSkill] = useState<HoveredSkillInfo | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // 3D physics and state refs (run at 60fps without React re-render overhead)
  const orientationRef = useRef<THREE.Quaternion>(
    new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0.15),
  );
  const velocityRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const isHoveringItemRef = useRef(false);
  const isVisibleRef = useRef(true);

  // Compute uniform Fibonacci sphere distribution for skills count
  const spherePoints = useMemo(() => {
    const count = skills.length;
    const points: THREE.Vector3[] = [];
    const phi = (1 + Math.sqrt(5)) / 2;
    const goldenAngle = 2 * Math.PI * (1 - 1 / phi);

    for (let i = 0; i < count; i++) {
      // y evenly ranges from 1 to -1
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      points.push(new THREE.Vector3(x, y, z));
    }
    return points;
  }, []);

  // IntersectionObserver to pause rendering when section is off-screen
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // Main 60fps animation loop with quaternion 3D rotation, momentum, inertia & depth projection
  useEffect(() => {
    let animId = 0;
    const tempVec = new THREE.Vector3();

    const loop = (): void => {
      animId = requestAnimationFrame(loop);

      if (!isVisibleRef.current) return;

      const stage = stageRef.current;
      if (!stage) return;

      // When not dragging, handle momentum inertia or continuous slow auto-rotation
      if (!isDraggingRef.current) {
        const speed = Math.hypot(velocityRef.current.x, velocityRef.current.y);

        if (speed > 0.00015) {
          // Inertia spinning with momentum
          const axis = new THREE.Vector3(velocityRef.current.x, velocityRef.current.y, 0).normalize();
          const deltaQ = new THREE.Quaternion().setFromAxisAngle(axis, speed);
          orientationRef.current.premultiply(deltaQ).normalize();

          // Friction decay
          velocityRef.current.x *= 0.94;
          velocityRef.current.y *= 0.94;
        } else if (!reduceMotion && !isHoveringItemRef.current) {
          // Gentle continuous auto-rotation
          const autoAxis = new THREE.Vector3(0.18, 1, 0.06).normalize();
          const autoQ = new THREE.Quaternion().setFromAxisAngle(autoAxis, 0.0022);
          orientationRef.current.premultiply(autoQ).normalize();
        }
      }

      // Responsive globe radius based on container dimensions
      const stageRect = stage.getBoundingClientRect();
      const radius = Math.min(stageRect.width, stageRect.height) * 0.42;

      // Project all 35 points onto 2D screen with depth cues
      for (let i = 0; i < skills.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;

        tempVec.copy(spherePoints[i]).applyQuaternion(orientationRef.current);

        const x = tempVec.x;
        const y = tempVec.y;
        const z = tempVec.z; // -1 (far back) to +1 (front)

        // Depth factor t in [0, 1]
        const t = (z + 1) * 0.5;

        // Subtle perspective foreshortening
        const persp = 1 / (1 - z * 0.22);
        const screenX = x * radius * persp;
        const screenY = y * radius * persp;

        // Front icons are larger (up to 1.16) and fully opaque; back icons are smaller (~0.62) and dimmer (~0.22)
        const scale = 0.62 + t * 0.54;
        const opacity = 0.22 + Math.pow(t, 1.4) * 0.78;
        const zIndex = Math.round(t * 100);

        el.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;

        // Disable pointer interactions for deep back icons to prevent accidental occlusion
        el.style.pointerEvents = z > -0.35 ? 'auto' : 'none';
      }
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [reduceMotion, spherePoints]);

  /* ── Full 360° Quaternion Drag Handlers ── */
  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>): void => {
    // Only primary pointer button
    if (event.button !== 0 && event.pointerType === 'mouse') return;

    isDraggingRef.current = true;
    setIsDragging(true);
    lastPosRef.current = { x: event.clientX, y: event.clientY };
    velocityRef.current = { x: 0, y: 0 };

    try {
      (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    } catch {
      // Ignore if pointer capture fails on certain devices
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>): void => {
    if (!isDraggingRef.current) return;

    const dx = event.clientX - lastPosRef.current.x;
    const dy = event.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: event.clientX, y: event.clientY };

    const dist = Math.hypot(dx, dy);
    if (dist < 0.2) return;

    // Quaternion rotation axis in screen space:
    // Moving horizontally (dx) rotates around screen Y axis [0, 1, 0]
    // Moving vertically (dy) rotates around screen X axis [1, 0, 0]
    // Resulting axis is (dy, dx, 0) normalized
    const axis = new THREE.Vector3(dy, dx, 0).normalize();
    const angle = dist * 0.0055;

    const deltaQ = new THREE.Quaternion().setFromAxisAngle(axis, angle);
    orientationRef.current.premultiply(deltaQ).normalize();

    // Store angular velocity for release inertia
    velocityRef.current = {
      x: dy * 0.005,
      y: dx * 0.005,
    };
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>): void => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      try {
        (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
      } catch {
        // Safe fallback
      }
    }
  };

  const handleItemHover = (name: string, iconClass: string, el: HTMLButtonElement): void => {
    isHoveringItemRef.current = true;
    const stage = stageRef.current;
    if (!stage) return;

    const stageRect = stage.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    setHoveredSkill({
      name,
      iconClass,
      x: elRect.left + elRect.width / 2 - stageRect.left,
      y: elRect.top - stageRect.top - 8,
    });
  };

  const handleItemLeave = (): void => {
    isHoveringItemRef.current = false;
    setHoveredSkill(null);
  };

  return (
    <section id="skills" className="content-section section-anchor">
      <div className="container">
        <SectionHeading kicker="04 / SKILLS" prefix="Technical Skills -" highlight="Core Expertise!" />

        <div className="skills-globe-wrapper reveal">
          <div
            ref={stageRef}
            className={`skills-globe-stage${isDragging ? ' is-dragging' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            role="region"
            aria-label="Interactive 3D skills sphere. Drag in any direction to rotate."
            tabIndex={0}
          >
            {/* Ambient Purple/Blue Glow Aura */}
            <div className="globe-ambient-glow" aria-hidden="true" />

            {/* Faint Astrological Orbital Rings in gradient colors */}
            <svg className="globe-rings" viewBox="0 0 500 500" aria-hidden="true">
              <defs>
                <linearGradient id="globeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#c084fc" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="globeGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              {/* Outer tilted dashed orbit */}
              <ellipse
                cx="250"
                cy="250"
                rx="215"
                ry="78"
                transform="rotate(-26 250 250)"
                stroke="url(#globeGrad1)"
                strokeWidth="1.2"
                strokeDasharray="6 6"
                fill="none"
              />
              {/* Counter-tilted orbit */}
              <ellipse
                cx="250"
                cy="250"
                rx="205"
                ry="70"
                transform="rotate(34 250 250)"
                stroke="url(#globeGrad2)"
                strokeWidth="1.2"
                strokeDasharray="4 8"
                fill="none"
              />
              {/* Polar boundary ring */}
              <circle
                cx="250"
                cy="250"
                r="195"
                stroke="url(#globeGrad1)"
                strokeWidth="1"
                strokeDasharray="2 10"
                fill="none"
                opacity="0.35"
              />
            </svg>

            {/* Billboarded Skill Icons distributed over Fibonacci sphere */}
            <div className="globe-items-layer" aria-hidden="true">
              {skills.map((skill, index) => (
                <button
                  key={skill.name}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="globe-item tilt-card"
                  type="button"
                  tabIndex={0}
                  aria-label={skill.name}
                  onMouseEnter={(e) => handleItemHover(skill.name, skill.iconClass, e.currentTarget)}
                  onMouseLeave={handleItemLeave}
                  onFocus={(e) => handleItemHover(skill.name, skill.iconClass, e.currentTarget)}
                  onBlur={handleItemLeave}
                  onClick={(e) => handleItemHover(skill.name, skill.iconClass, e.currentTarget)}
                >
                  <i className={skill.iconClass} />
                </button>
              ))}
            </div>

            {/* Glass-style Tooltip on Icon Hover */}
            {hoveredSkill && (
              <div
                className="globe-tooltip glass-card"
                style={{
                  left: `${hoveredSkill.x}px`,
                  top: `${hoveredSkill.y}px`,
                }}
                role="tooltip"
              >
                <i className={hoveredSkill.iconClass} style={{ marginRight: '6px' }} />
                <span>{hoveredSkill.name}</span>
              </div>
            )}
          </div>

          {/* Hint Under Globe */}
          <p className="globe-hint">
            <i className="fa-solid fa-arrows-up-down-left-right" aria-hidden="true" />
            <span>Drag in any direction to explore 360° • Hover icons for details</span>
          </p>

          {/* Semantic Non-3D Fallback for screen readers and accessibility */}
          <div className="sr-only">
            <h3>Technical Skills List</h3>
            <ul>
              {skills.map((skill) => (
                <li key={skill.name}>{skill.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
