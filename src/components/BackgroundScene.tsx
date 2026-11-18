import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BackgroundSceneProps {
  reduceMotion: boolean;
  theme?: 'dark' | 'light';
}

export function BackgroundScene({ reduceMotion, theme = 'dark' }: BackgroundSceneProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsMaterialRef = useRef<THREE.PointsMaterial | null>(null);
  const dustMaterialRef = useRef<THREE.PointsMaterial | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);

    const count = window.innerWidth < 700 ? 1450 : 3200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
      const radius = 5 + Math.random() * 13;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[index * 3 + 2] = radius * Math.cos(phi);
      sizes[index] = 0.7 + Math.random() * 1.9;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const isLight = theme === 'light';

    const material = new THREE.PointsMaterial({
      color: isLight ? 0x7c3aed : 0xc4b5fd,
      size: window.innerWidth < 700 ? 0.025 : 0.032,
      transparent: true,
      opacity: isLight ? 0.35 : 0.72,
      depthWrite: false,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    starsMaterialRef.current = material;

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    const dustGeometry = new THREE.BufferGeometry();
    const dustCount = window.innerWidth < 700 ? 350 : 700;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let index = 0; index < dustCount; index += 1) {
      dustPositions[index * 3] = (Math.random() - 0.5) * 14;
      dustPositions[index * 3 + 1] = (Math.random() - 0.5) * 9;
      dustPositions[index * 3 + 2] = -2 + Math.random() * 6;
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: isLight ? 0x0284c7 : 0x67e8f9,
      size: 0.013,
      transparent: true,
      opacity: isLight ? 0.22 : 0.28,
      depthWrite: false,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    dustMaterialRef.current = dustMaterial;

    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    const mouse = { x: 0, y: 0 };
    const handlePointerMove = (event: PointerEvent): void => {
      mouse.x = (event.clientX / window.innerWidth - 0.5) * 0.45;
      mouse.y = (event.clientY / window.innerHeight - 0.5) * 0.28;
    };

    const handleResize = (): void => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    const clock = new THREE.Clock();
    let animationFrame = 0;
    const animate = (): void => {
      const elapsed = clock.getElapsedTime();
      if (!reduceMotion) {
        stars.rotation.y = elapsed * 0.012 + mouse.x * 0.18;
        stars.rotation.x += (mouse.y * 0.08 - stars.rotation.x) * 0.018;
        dust.rotation.y = -elapsed * 0.008;
        dust.position.x += (mouse.x * 0.35 - dust.position.x) * 0.012;
        camera.position.y = Math.sin(elapsed * 0.16) * 0.035;
      }
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrame);
      geometry.dispose();
      material.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();
      starsMaterialRef.current = null;
      dustMaterialRef.current = null;
    };
  }, [reduceMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  // Dynamically update star materials whenever theme changes
  useEffect(() => {
    const starMat = starsMaterialRef.current;
    const dustMat = dustMaterialRef.current;
    if (!starMat || !dustMat) return;

    if (theme === 'light') {
      starMat.color.setHex(0x7c3aed);
      starMat.opacity = 0.35;
      starMat.blending = THREE.NormalBlending;
      dustMat.color.setHex(0x0284c7);
      dustMat.opacity = 0.22;
      dustMat.blending = THREE.NormalBlending;
    } else {
      starMat.color.setHex(0xc4b5fd);
      starMat.opacity = 0.72;
      starMat.blending = THREE.AdditiveBlending;
      dustMat.color.setHex(0x67e8f9);
      dustMat.opacity = 0.28;
      dustMat.blending = THREE.AdditiveBlending;
    }
    starMat.needsUpdate = true;
    dustMat.needsUpdate = true;
  }, [theme]);

  return (
    <div className="scene" aria-hidden="true">
      <canvas ref={canvasRef} id="bg-canvas" />
      <div className="scene-vignette" />
    </div>
  );
}
