const fs = require("fs");

const supabaseUrl = "https://qulpmylesjaqwhsiytwo.supabase.co";
const supabaseApiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1bHBteWxlc2phcXdoc2l5dHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQwMzMxNjMsImV4cCI6MjAwOTYwOTE2M30._qXB3pcQhxZa7C7Bg15UOpxpheTnT9uB_9AsT6dgwmQ"; // Reemplaza con tu API Key de Supabase

// Lee y carga el archivo JSON
const jsonData = fs.readFileSync("coverage.json", "utf-8");
const data = JSON.parse(jsonData);

// URL de la API de tu tabla en Supabase
const tableUrl = `${supabaseUrl}/rest/v1/countries`;

// Realiza la solicitud POST para cargar los datos
fetch(tableUrl, {
  method: "POST",
  headers: {
    "apikey": supabaseApiKey,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => {
    if (response.status === 201) {
      console.log("Datos cargados exitosamente.");
    } else {
      console.error("Error al cargar datos:", response.status, response.statusText);
    }
  })
  .catch((error) => {
    console.error("Error en la solicitud:", error);
  });
