"use client";
import { useEffect, useRef } from "react";

interface Props {
  lat: number | null;
  lng: number | null;
  onChange: (lat: number, lng: number) => void;
}

// Mapa real con Leaflet + OpenStreetMap (sin API key). Pin arrastrable.
export default function MapaPin({ lat, lng, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !ref.current || mapRef.current) return;

      const start: [number, number] = [lat ?? 4.6486, lng ?? -74.1000]; // Bogotá
      const map = L.map(ref.current, { center: start, zoom: 12 });
      mapRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19, attribution: "© OpenStreetMap",
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: '<div style="font-size:28px;line-height:28px;transform:translate(-50%,-100%)">📍</div>',
        iconSize: [1, 1],
      });
      const marker = L.marker(start, { draggable: true, icon }).addTo(map);
      markerRef.current = marker;

      const emit = (ll: any) => onChange(Number(ll.lat.toFixed(6)), Number(ll.lng.toFixed(6)));
      marker.on("dragend", () => emit(marker.getLatLng()));
      map.on("click", (e: any) => { marker.setLatLng(e.latlng); emit(e.latlng); });

      setTimeout(() => map.invalidateSize(), 200);
    })();
    return () => {
      cancelled = true;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div ref={ref} className="h-64 w-full overflow-hidden rounded-xl border border-black/10" />
      <p className="mt-2 text-xs text-black/50">Toca el mapa o arrastra el pin 📍 para marcar el punto de recogida.</p>
    </div>
  );
}
