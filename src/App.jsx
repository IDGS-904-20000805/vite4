import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import appLogo from '/favicon.svg'
// import PWABadge from './PWABadge.jsx'
import './App.css'

const DATOS_INICIALES = [
  { id: 1759367381541, nombre: 'Tarea 1: Aprender JS', completado: false },
  { id: 1759367381541, nombre: 'Tarea 2: Aprender React', completado: true },
];

function App() {
  const [items, setItems] = useState(DATOS_INICIALES);

  // 1. CREATE (Crear Nuevo Ítem)
  const handleCreate = (nuevoNombre) => {
    const nuevoItem = {
      id: Date.now(), 
      nombre: nuevoNombre,
      completado: false,
    };
    setItems([...items, nuevoItem]);
  };

  // 2. DELETE (Eliminar Ítem por ID)
  const handleDelete = (idParaEliminar) => {
    const itemsActualizados = items.filter(item => item.id !== idParaEliminar);
    setItems(itemsActualizados);
  };


  // 3. UPDATE (Actualizar Ítem: cambiar estado de 'completado')
  const handleUpdate = (idParaActualizar) => {
    const itemsActualizados = items.map(item => {
      if (item.id === idParaActualizar) {
        return { ...item, completado: !item.completado };
      }
      return item;
    });
    setItems(itemsActualizados);
  };


  // 4. COMPONENTE INTERNO: FormularioAgregar (Definición ÚNICA)
  const FormularioAgregar = () => {
    const [nombre, setNombre] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!nombre.trim()) return;
      handleCreate(nombre);
      setNombre('');
    };

    return (
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nuevo nombre de tarea"
        />
        <br />
        <br />
        <button type="submit"> Crear</button>
      </form>
    );
  };



  // 5. RENDERIZADO PRINCIPAL 
  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Tareas y Actividades</h1>


      <FormularioAgregar />

      <hr />

      {/* READ, UPDATE, DELETE UI */}
      <ul>
        {items.map(item => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            <span style={{ textDecoration: item.completado ? 'line-through' : 'none' }}>
              {item.nombre} - **ID:** {item.id}
            </span>

            {/* Botón UPDATE */}
            <button
              onClick={() => handleUpdate(item.id)}
              style={{ marginLeft: '10px' }}
            >
              {item.completado ? 'Deshacer' : 'Completar'}
            </button>

            {/* Botón DELETE */}
            <button
              onClick={() => handleDelete(item.id)}
              style={{ marginLeft: '10px', color: 'red' }
            }
            >
               Eliminar
            </button>
          </li>
        ))}
      </ul>

      {items.length === 0 && <p>No hay actividades a realizar</p>}
    </div>
  );
}

export default App
