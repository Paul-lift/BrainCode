// Importiere globales CSS
"use client";
import { useState } from "react"; // useState korrekt importieren
import styles from "./page.module.css"; // Importiere die CSS-Datei für Styles

export default function HomePage() {
  const [started, setStarted] = useState(false); // useState korrekt verwenden

  // Funktion, die ausgeführt wird, wenn der Button geklickt wird
  const startQuiz = () => {
    setStarted(true);
    alert("Quiz wird gestartet!");
  };

  return (
    <div className={`${styles.bgGradient} min-h-screen`}>
      <div className="container mx-auto max-w-4xl">
        <div className="text-center py-8">
          <div className="flex justify-center items-center gap-3 mb-6">
            <h1 className={styles.title}>BrainCode</h1>
          </div>
          <p className="text-xl text-white/90 mb-8">
            Entdecke deinen einzigartigen Intelligenztyp!
          </p>
        </div>

        <div className={styles.infoBox}>
          <div className="text-center">
            <h2 className="text-2xl text-black mb-4">
              Was sind Multiple Intelligenzen?
            </h2>{" "}
            <p className="text-lg text-black mb-6">
              Nach Howard Gardner's Theorie
            </p>{" "}
            <div className={styles.card}>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  🧠 8 Intelligenztypen
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Sprachlich-linguistisch</li>
                  <li>• Logisch-mathematisch</li>
                  <li>• Räumlich-visuell</li>
                  <li>• Körperlich-kinästhetisch</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">
                  ✨ Weitere Typen
                </h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Musikalisch-rhythmisch</li>
                  <li>• Interpersonal (sozial)</li>
                  <li>• Intrapersonal (selbstbezogen)</li>
                  <li>• Naturalistisch</li>
                </ul>
              </div>
            </div>
            <p className="text-black mb-6">
              Unser Quiz hilft dir dabei herauszufinden, welcher Intelligenztyp
              bei dir am stärksten ausgeprägt ist. Es gibt keine "richtigen"
              oder "falschen" Antworten - jeder Typ ist wertvoll und
              einzigartig!
            </p>
            <div className="text-center pt-6">
              <button onClick={startQuiz} className={styles.button}>
                Quiz starten
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-white/80">
          <p className="text-sm">
            Dauer: ca. 5 Minuten • 10 Fragen • Sofortiges Ergebnis
          </p>
        </div>
      </div>
    </div>
  );
}
