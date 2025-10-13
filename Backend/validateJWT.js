import dotenv from "dotenv";
import fs from "fs";
import jwt from "jsonwebtoken";
import axios from "axios";

dotenv.config();

const appId = process.env.GITHUB_APP_ID;
const privateKeyPath = process.env.GITHUB_PRIVATE_KEY_PATH;

if (!fs.existsSync(privateKeyPath)) {
  console.error("❌ ERROR: No se encontró el archivo de la PRIVATE KEY");
  process.exit(1);
}

const privateKey = fs.readFileSync(privateKeyPath, "utf8");

// Generar JWT
const jwtToken = jwt.sign(
  {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 9 * 60,
    iss: appId
  },
  privateKey,
  { algorithm: "RS256" }
);

console.log("🔐 JWT generado correctamente\n");

// Listar instalaciones
const listInstallations = async () => {
  try {
    const res = await axios.get(
      `https://api.github.com/app/installations`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          Accept: "application/vnd.github+json"
        }
      }
    );

    if (res.data.length === 0) {
      console.log("⚠️  No se encontraron instalaciones.");
      console.log("Por favor, instala tu GitHub App en:");
      console.log(`https://github.com/apps/portfolioso/installations/new`);
      return;
    }

    console.log("✅ Instalaciones encontradas:\n");
    res.data.forEach(installation => {
      console.log(`📌 Installation ID: ${installation.id}`);
      console.log(`   Cuenta: ${installation.account.login}`);
      console.log(`   Tipo: ${installation.account.type}`);
      console.log(`   URL: ${installation.html_url}\n`);
    });

    console.log("💡 Copia el Installation ID correcto a tu archivo .env");
  } catch (err) {
    console.error("❌ ERROR al listar instalaciones");
    if (err.response) {
      console.log("Status:", err.response.status);
      console.log("Mensaje:", err.response.data);
    } else {
      console.log(err.message);
    }
  }
};

listInstallations();