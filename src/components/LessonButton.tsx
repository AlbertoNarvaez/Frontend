import { useMemo, useState } from "react";

function buildFacebookShare(url: string) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
}

function buildTwitterShare(text: string, url: string) {
  const base = "https://twitter.com/intent/tweet";
  const params = new URLSearchParams({
    text,
    url,
  });
  return `${base}?${params.toString()}`;
}

export default function LessonButton() {
  const [isLessonShowing, setIsLessonShowing] = useState(false);
  const [lessonNumber, setLessonNumber] = useState<number>(0);
  const [lesson, setLesson] = useState<string>("");
  const [isSpinning, setIsSpinning] = useState(false);

  const promptsDisplay = useMemo(
    () => ({ display: isLessonShowing ? "none" : "block" }),
    [isLessonShowing]
  );

  const lessonDisplay = useMemo(
    () => ({ display: isLessonShowing ? "block" : "none" }),
    [isLessonShowing]
  );

  const socialsDisplay = useMemo(
    () => ({ display: isLessonShowing ? "flex" : "none" }),
    [isLessonShowing]
  );

  const currentUrl = useMemo(() => window.location.href, []);

  const fbShareLink = useMemo(
    () => buildFacebookShare(currentUrl),
    [currentUrl]
  );

  const twitShareLink = useMemo(
    () =>
      buildTwitterShare(
        `Lesson #${lessonNumber}: ${lesson}`,
        currentUrl
      ),
    [lessonNumber, lesson, currentUrl]
  );

  // 🔥 CONEXIÓN REAL A LA API DEL PROFE
  async function fetchLessonFromApi() {
    const res = await fetch("https://lessons-api.vercel.app");

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    // La API devuelve:
    // { "wisdom": "12. Nobody beats the wiz." }

    const wisdom: string = data.wisdom;

    if (!wisdom) {
      throw new Error("No wisdom received");
    }

    const parts = wisdom.split(". ");
    const num = parseInt(parts[0], 10);
    const text = parts.slice(1).join(". ");

    return {
      num: isNaN(num) ? 0 : num,
      text: text || wisdom,
    };
  }

  async function showLesson() {
    if (isSpinning) return;

    setIsLessonShowing(true);
    setIsSpinning(true);

    // 🎰 EFECTO RULETA
    const roulette = setInterval(() => {
      setLessonNumber(Math.floor(Math.random() * 500));
      setLesson("Loading lesson...");
    }, 60);

    try {
      const { text, num } = await fetchLessonFromApi();

      setTimeout(() => {
        clearInterval(roulette);
        setLesson(text);
        setLessonNumber(num);
        setIsSpinning(false);
      }, 1200);
    } catch {
      clearInterval(roulette);
      setLesson("Error fetching lesson. Try again.");
      setLessonNumber(420);
      setIsSpinning(false);
    }
  }

  function fbClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.open(fbShareLink, "_blank", "noopener,noreferrer");
  }

  function twitClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.open(twitShareLink, "_blank", "noopener,noreferrer");
  }

  return (
    <div id="button-flex-container" style={{ flexGrow: 1 }}>
      <img
        id="button-img-mobile"
        src="/img/button-mobile.8dae58c0.png"
        alt="Lesson button."
        onClick={showLesson}
      />

      <img
        id="button-img-desktop"
        src="/img/button-desktop.6ff93e26.png"
        alt="Lesson button."
        onClick={showLesson}
      />

      <div id="lesson-prompt" style={promptsDisplay} onClick={showLesson}>
        <h1>Click Here</h1>
        <h2>To learn your lesson</h2>
      </div>

      <div id="click-alerts" style={promptsDisplay} onClick={showLesson}>
        <h2>click here</h2>
        <h2>first</h2>
        <h2>click here</h2>
        <h2>first</h2>
      </div>

      <div id="lesson-number" style={lessonDisplay} onClick={showLesson}>
        Lesson #{lessonNumber}
      </div>

      <div id="lesson-text" style={lessonDisplay} onClick={showLesson}>
        {lesson}
      </div>

      <div id="socials-container" style={socialsDisplay}>
        <img
          id="share-with-friends-1"
          src="/img/share-with-friends.161d506d.png"
          alt="share with your human friends"
        />

        <a
          href={fbShareLink}
          target="_blank"
          rel="noreferrer"
          style={{ margin: "0 7px 0 15px" }}
          onClick={fbClick}
        >
          <img
            src="/img/fb-logo.96f2b976.png"
            alt="Share to Facebook."
          />
        </a>

        <a
          href={twitShareLink}
          target="_blank"
          rel="noreferrer"
          style={{ marginRight: "15px" }}
          onClick={twitClick}
        >
          <img
            src="/img/twitter-logo.ebe3c4fc.png"
            alt="Share to Twitter."
          />
        </a>

        <img
          id="share-with-friends-2"
          src="/img/share-with-friends.161d506d.png"
          alt="share with your human friends"
        />
      </div>
    </div>
  );
}
