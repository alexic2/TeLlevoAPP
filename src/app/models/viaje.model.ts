export interface Viaje {
    id: string;
    name: string;
    destino: string;
    capacidad: number;
    price: number;
    estado: 'pendiente' | 'aceptado';
      // Agregar información del usuario solicitante
  usuarioSolicitante?: {
    nombre: string;
    email: string;
    uid: string;
  };
}