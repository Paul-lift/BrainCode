"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import styles from "./page.module.css"

const intelligenceTypes = {
    linguistic: {
      name: "Sprachlich-linguistisch",
      icon: "📚",
      description: "Du hast eine besondere Begabung für Sprache und Worte!",
      traits: [
        "Du liebst es zu lesen, zu schreiben und Geschichten zu erzählen",
        "Wortspiele und Reime fallen dir leicht",
        "Du kannst komplexe Ideen gut in Worte fassen",
        "Fremdsprachen zu lernen macht dir Spaß",
      ],
      careers: ["Autor/in", "Journalist/in", "Lehrer/in", "Anwalt/Anwältin", "Übersetzer/in"],
      tips: "Nutze deine Sprachbegabung! Schreibe Tagebuch, erstelle Blogs oder nimm an Debattierclubs teil.",
    },
    mathematical: {
      name: "Logisch-mathematisch",
      icon: "🔢",
      description: "Du denkst analytisch und liebst es, Probleme zu lösen!",
      traits: [
        "Zahlen und Muster erkennst du schnell",
        "Du gehst systematisch und logisch an Probleme heran",
        "Rätsel und Denkaufgaben bereiten dir Freude",
        "Du fragst gerne nach dem 'Warum' und 'Wie'",
      ],
      careers: ["Mathematiker/in", "Ingenieur/in", "Programmierer/in", "Wissenschaftler/in", "Analyst/in"],
      tips: "Fordere dein logisches Denken heraus! Löse Sudokus, lerne Programmieren oder experimentiere in den Naturwissenschaften.",
    },
    spatial: {
      name: "Räumlich-visuell",
      icon: "🎨",
      description: "Du denkst in Bildern und hast ein ausgeprägtes räumliches Vorstellungsvermögen!",
      traits: [
        "Du kannst dir Dinge gut bildlich vorstellen",
        "Zeichnen, Malen oder Basteln liegt dir",
        "Du orientierst dich gut im Raum",
        "Farben, Formen und Design sprechen dich an",
      ],
      careers: ["Architekt/in", "Designer/in", "Künstler/in", "Fotograf/in", "Pilot/in"],
      tips: "Entwickle deine visuellen Fähigkeiten! Zeichne, fotografiere oder beschäftige dich mit 3D-Modellierung.",
    },
    kinesthetic: {
      name: "Körperlich-kinästhetisch",
      icon: "🏃",
      description: "Du lernst am besten durch Bewegung und praktisches Tun!",
      traits: [
        "Du bewegst dich gerne und bist sportlich aktiv",
        "Handwerkliche Tätigkeiten fallen dir leicht",
        "Du lernst besser, wenn du etwas ausprobieren kannst",
        "Du hast eine gute Körperbeherrschung",
      ],
      careers: ["Sportler/in", "Handwerker/in", "Chirurg/in", "Tänzer/in", "Physiotherapeut/in"],
      tips: "Nutze Bewegung zum Lernen! Mache Pausen für körperliche Aktivität und lerne durch praktische Übungen.",
    },
    musical: {
      name: "Musikalisch-rhythmisch",
      icon: "🎵",
      description: "Du hast ein natürliches Gespür für Musik und Rhythmus!",
      traits: [
        "Du erkennst Melodien und Rhythmen schnell",
        "Musik hören oder machen bereitet dir Freude",
        "Du kannst gut singen oder Instrumente spielen",
        "Klänge und Geräusche nimmst du bewusst wahr",
      ],
      careers: ["Musiker/in", "Komponist/in", "Musiklehrer/in", "Tontechniker/in", "Musikproduzent/in"],
      tips: "Entwickle deine musikalischen Fähigkeiten! Lerne ein Instrument, komponiere eigene Melodien oder nutze Musik beim Lernen.",
    },
    interpersonal: {
      name: "Interpersonal (sozial)",
      icon: "👥",
      description: "Du verstehst andere Menschen gut und arbeitest gerne im Team!",
      traits: [
        "Du kannst gut mit anderen Menschen umgehen",
        "Teamarbeit macht dir Spaß",
        "Du hilfst gerne anderen bei Problemen",
        "Du erkennst die Gefühle anderer schnell",
      ],
      careers: ["Psychologe/in", "Lehrer/in", "Sozialarbeiter/in", "Verkäufer/in", "Politiker/in"],
      tips: "Nutze deine sozialen Fähigkeiten! Engagiere dich in Gruppen, übernimm Führungsrollen oder werde Mentor/in für andere.",
    },
    intrapersonal: {
      name: "Intrapersonal (selbstbezogen)",
      icon: "🧘",
      description: "Du kennst dich selbst gut und reflektierst gerne über das Leben!",
      traits: [
        "Du denkst viel über dich selbst nach",
        "Du kennst deine Stärken und Schwächen",
        "Du arbeitest gerne alleine und selbstständig",
        "Du hast klare Ziele und Werte",
      ],
      careers: ["Philosoph/in", "Schriftsteller/in", "Berater/in", "Forscher/in", "Unternehmer/in"],
      tips: "Nutze deine Selbstreflexion! Führe ein Tagebuch, setze dir klare Ziele und arbeite an deiner Persönlichkeitsentwicklung.",
    },
    naturalistic: {
      name: "Naturalistisch",
      icon: "🌱",
      description: "Du liebst die Natur und verstehst natürliche Zusammenhänge!",
      traits: [
        "Du interessierst dich für Tiere und Pflanzen",
        "Du verbringst gerne Zeit in der Natur",
        "Umweltthemen sind dir wichtig",
        "Du erkennst Muster in der Natur",
      ],
      careers: ["Biologe/in", "Tierarzt/Tierärztin", "Gärtner/in", "Umweltschützer/in", "Förster/in"],
      tips: "Verbinde dich mit der Natur! Gärtnere, beobachte Tiere oder engagiere dich im Umweltschutz.",
    },
  }

export default function Page() {
  const [result, setResult] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem("quizAnswers")
    if (saved) {
      const answers = JSON.parse(saved)

      // Typen zählen
      const counts = {}
      Object.values(answers).forEach((type) => {
        counts[type] = (counts[type] || 0) + 1
      })

      // Höchsten Score finden
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
      const topType = sorted[0][0]

      setResult({
        type: topType,
        scores: counts,
      })

      // Ergebnis auch speichern (falls man teilen will o. ä.)
      localStorage.setItem("quizResult", JSON.stringify({
        type: topType,
        scores: counts,
      }))
    }
  }, [])

  if (!result) {
    return (
      <div className={styles.centered}>
        <div className={styles.card}>
          <p>Kein Ergebnis gefunden.</p>
          <Link href="/quiz">Quiz starten</Link>
        </div>
      </div>
    )
  }

  const data = intelligenceTypes[result.type]
  const max = Math.max(...Object.values(result.scores))

  return (
    <div className={styles.container}>
      <h1>{data.icon} {data.name}</h1>
      <p className={styles.desc}>{data.description}</p>

      <h2>Das zeichnet dich aus:</h2>
      <ul>
        {data.traits.map((t, i) => <li key={i}>✓ {t}</li>)}
      </ul>

      <h2>Berufe:</h2>
      <ul className={styles.inlineList}>
        {data.careers.map((c, i) => <li key={i}>{c}</li>)}
      </ul>

      <h3><em>{data.tips}</em></h3>

      <h2>Ergebnisse:</h2>
      {Object.entries(result.scores).sort((a, b) => b[1] - a[1]).map(([type, score]) => {
        const info = intelligenceTypes[type]
        const percent = (score / max) * 100
        return (
          <div key={type}>
            <strong>{info.icon} {info.name}:</strong> {score} Punkte
            <div className={styles.bar}>
              <div className={styles.fill} style={{ width: percent + "%" }}></div>
            </div>
          </div>
        )
      })}

      <div className={styles.links}>
        <Link href="/">Zur Startseite</Link>
        <Link href="/quiz">Quiz wiederholen</Link>
      </div>
    </div>
  )
}
