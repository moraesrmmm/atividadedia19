import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {

  const [formulario, setFormulario] = useState({
    cep: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  const [posts, setPosts] = useState([]);

  const buscarEndereco = async () => {
  const cep = formulario.cep.replace(/\D/g, '');
  if (cep.length === 8) {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setFormulario((prevFormulario) => ({
        ...prevFormulario,
        endereco: response.data.logradouro,
        bairro: response.data.bairro,
        cidade: response.data.localidade,
        estado: response.data.uf,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  useEffect(() => {
  const buscarPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data.slice(0, 10)); 
    } catch (error) {
      console.log("deu erro");
    }
  };

  buscarPosts();
  }, []);

  return (
  <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>react escobar</h1>

    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#fafafa' }}>
    <h2>Formulário Endereço</h2>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <label>CEP:</label>
          <input type="text" name="cep" value={formulario.cep} onChange={handleChange} onBlur={buscarEndereco} maxLength="9" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Endereço:</label>
          <input type="text" name="endereco" value={formulario.endereco} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Bairro:</label>
          <input type="text" name="bairro" value={formulario.bairro} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Cidade:</label>
          <input type="text" name="cidade" value={formulario.cidade} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Estado:</label>
          <input type="text" name="estado" value={formulario.estado} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer', width: '100%' }}>
        Enviar
        </button>
      </form>
    </div>

    <div style={{ padding: '20px', maxWidth: '800px', margin: '40px auto' }}>
    <h2 style={{ textAlign: 'center' }}>Blog</h2>
    {posts.map((post) => (
      <div key={post.id} style={{ border: '1px solid #ddd', padding: '16px', marginBottom: '16px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#fafafa'
        }}>
        <img src={`https://source.unsplash.com/800x400/?nature,water&sig=${post.id}`} alt="Post" style={{ width: '100%', borderRadius: '8px', marginBottom: '12px' }}
        />
        <h3 style={{ marginBottom: '8px', color: '#333' }}>{post.title}</h3>
        <p style={{ color: '#555', lineHeight: '1.6' }}>{post.body}</p>
      </div>
    ))}
    </div>
  </div>
  );
};

export default App;
