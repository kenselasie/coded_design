"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { WorldId } from "codeddesign/theme";

type Marker = {
  id: WorldId;
  label: string;
  lat: number;
  lon: number;
  color: string;
};

const MARKERS: Marker[] = [
  { id: "codedcartoony", label: "Cartoony", lat: 12, lon: -28, color: "#ff6b9a" },
  { id: "codedmarker", label: "Marker", lat: 36, lon: 18, color: "#d2ff3a" },
  { id: "codededwadzi", label: "Edwadzi", lat: -8, lon: 42, color: "#009788" },
];

function latLonToVec(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function paintGlobe(ctx: CanvasRenderingContext2D, w: number, h: number, accent: string) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#7ec8ff");
  g.addColorStop(0.5, "#2f7dff");
  g.addColorStop(1, "#163a6a");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.55;
  const blobs = [
    [0.18, 0.28, 0.12, 0.22],
    [0.42, 0.3, 0.16, 0.14],
    [0.62, 0.48, 0.18, 0.2],
    [0.78, 0.34, 0.1, 0.16],
    [0.3, 0.62, 0.14, 0.12],
  ];
  for (const [x, y, bw, bh] of blobs) {
    ctx.beginPath();
    ctx.ellipse(w * x, h * y, w * bw, h * bh, 0.35, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.lineWidth = 1.5;
  for (let i = 1; i < 6; i++) {
    const y = (h / 6) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  for (let i = 1; i < 12; i++) {
    const x = (w / 12) * i;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
}

function makeLabelSprite(text: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 384;
  canvas.height = 96;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, opacity: 0 }));
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '700 34px "Fraunces", "Fredoka", system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";
  ctx.miterLimit = 2;

  const x = canvas.width / 2;
  const y = canvas.height / 2 - 2;
  ctx.strokeStyle = "rgba(10, 14, 28, 0.55)";
  ctx.lineWidth = 7;
  ctx.strokeText(text, x, y);
  ctx.fillStyle = "#fffef8";
  ctx.fillText(text, x, y);

  const metrics = ctx.measureText(text);
  const underlineW = Math.min(metrics.width + 8, canvas.width - 32);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.95;
  ctx.fillRect(x - underlineW / 2, y + 16, underlineW, 3.5);
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.58, 0.145, 1);
  sprite.center.set(0.5, 0.15);
  sprite.userData.texture = texture;
  return sprite;
}

export function WorldGlobe({
  world,
  onChoose,
}: {
  world: WorldId;
  onChoose: (id: WorldId) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef(world);
  const onChooseRef = useRef(onChoose);
  worldRef.current = world;
  onChooseRef.current = onChoose;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const width = host.clientWidth || 480;
    const height = host.clientHeight || Math.max(360, Math.round(width * 0.9));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    host.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(3, 2, 4);
    const rim = new THREE.DirectionalLight(0x88ccff, 0.45);
    rim.position.set(-3, -1, -2);
    scene.add(ambient, key, rim);

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) paintGlobe(ctx, 1024, 512, "#3fdc7f");
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const root = new THREE.Group();
    root.scale.setScalar(0.92);
    scene.add(root);

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.72,
        metalness: 0.08,
      }),
    );
    root.add(globe);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.08, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0x6ec8ff,
        transparent: true,
        opacity: 0.16,
        side: THREE.BackSide,
      }),
    );
    root.add(atmosphere);

    type MarkerItem = {
      id: WorldId;
      mesh: THREE.Mesh;
      halo: THREE.Mesh;
      label: THREE.Sprite;
    };
    const markerMeshes: MarkerItem[] = [];
    for (const marker of MARKERS) {
      const pos = latLonToVec(marker.lat, marker.lon, 1.02);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 16, 16),
        new THREE.MeshStandardMaterial({
          color: marker.color,
          emissive: marker.color,
          emissiveIntensity: 0.55,
          roughness: 0.35,
        }),
      );
      mesh.position.copy(pos);
      mesh.userData.id = marker.id;
      globe.add(mesh);

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 16, 16),
        new THREE.MeshBasicMaterial({
          color: marker.color,
          transparent: true,
          opacity: 0.28,
        }),
      );
      halo.position.copy(pos);
      globe.add(halo);

      const label = makeLabelSprite(marker.label, marker.color);
      label.position.copy(latLonToVec(marker.lat, marker.lon, 1.12));
      label.userData.id = marker.id;
      globe.add(label);

      markerMeshes.push({ id: marker.id, mesh, halo, label });
    }

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let dragging = false;
    let lastX = 0;
    let velX = 0;
    let auto = true;

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      auto = false;
      lastX = event.clientX;
      velX = 0;
      renderer.domElement.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      if (!dragging) return;
      const dx = event.clientX - lastX;
      lastX = event.clientX;
      velX = dx * 0.005;
      globe.rotation.y += velX;
    };
    const onPointerUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      renderer.domElement.releasePointerCapture(event.pointerId);
      if (Math.abs(velX) < 0.002) {
        raycaster.setFromCamera(pointer, camera);
        const targets = markerMeshes.flatMap((m) => [m.mesh, m.label]);
        const hits = raycaster.intersectObjects(targets);
        if (hits[0]) {
          const id = hits[0].object.userData.id as WorldId;
          onChooseRef.current(id);
        }
      }
      window.setTimeout(() => {
        auto = true;
      }, 2400);
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);

    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (auto) globe.rotation.y += 0.00012;
      else globe.rotation.y += velX;
      velX *= 0.94;

      const active = worldRef.current;
      const camDir = new THREE.Vector3();
      const labelWorld = new THREE.Vector3();
      for (const item of markerMeshes) {
        const on = item.id === active;
        const scale = on ? 1.35 + Math.sin(performance.now() / 280) * 0.08 : 1;
        item.mesh.scale.setScalar(scale);
        item.halo.scale.setScalar(on ? 1.6 : 1);
        (item.halo.material as THREE.MeshBasicMaterial).opacity = on ? 0.4 : 0.18;
        item.label.scale.set(on ? 0.66 : 0.58, on ? 0.165 : 0.145, 1);

        item.label.getWorldPosition(labelWorld);
        camDir.copy(camera.position).sub(labelWorld).normalize();
        const facing = labelWorld.clone().normalize().dot(camDir);
        const show = facing > 0.2;
        item.label.visible = show;
        (item.label.material as THREE.SpriteMaterial).opacity = show
          ? Math.min(1, (facing - 0.2) / 0.35) * (on ? 1 : 0.92)
          : 0;
      }
      atmosphere.rotation.y = globe.rotation.y * 0.2;
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const w = host.clientWidth || width;
      const h = host.clientHeight || Math.max(360, Math.round(w * 0.9));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(host);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.dispose();
      texture.dispose();
      globe.geometry.dispose();
      (globe.material as THREE.Material).dispose();
      atmosphere.geometry.dispose();
      (atmosphere.material as THREE.Material).dispose();
      for (const item of markerMeshes) {
        item.mesh.geometry.dispose();
        (item.mesh.material as THREE.Material).dispose();
        item.halo.geometry.dispose();
        (item.halo.material as THREE.Material).dispose();
        const labelMat = item.label.material as THREE.SpriteMaterial;
        labelMat.map?.dispose();
        labelMat.dispose();
      }
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 280,
        touchAction: "none",
      }}
    />
  );
}
