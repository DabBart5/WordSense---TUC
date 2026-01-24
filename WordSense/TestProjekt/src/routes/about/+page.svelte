<script lang="ts">
  // No logic needed
</script>

<svelte:head>
  <title>About WordSense</title>
  <meta
    name="description"
    content="About WordSense"
  />
</svelte:head>

<section class="aboutContainer">
  <h1>About WordSense</h1>

  <p class="aboutParagraph">
    <strong>WordSense</strong> is a language-learning web application focused on
    vocabulary acquisition and word comprehension entirely within the target
    language. The goal is to provide a clean, accessible, and effective way to
    practice vocabulary and grammar without unnecessary complexity.
  </p>

  <p class="aboutParagraph">
    The project is currently focused on <strong>English</strong>, with the
    possibility of extending to additional languages in the future. The design
    prioritizes short learning sessions, mobile usability, and clarity.
  </p>

  <h2 class="sectionHeader">Learning Concept</h2>

  <p class="aboutParagraph">
    WordSense is built around the idea of learning words through their
    definitions and usage rather than direct translation. The core gameplay
    consists of matching words and definitions in multiple-choice formats, as
    well as reading and practicing grammar concepts inspired by CEFR levels
    (A1–C2).
  </p>

  <p class="aboutParagraph">
    The project draws inspiration from existing language-learning platforms.
  </p>

  <h2 class="sectionHeader">Inspiration</h2>

  <ul class="resourceList">
    <li>
      <a href="https://kotobataisen.com/" target="_blank" rel="noopener">
        Kotoba Taisen
      </a>
      – game-like vocabulary practice
    </li>
    <li>
      <a href="https://bunpro.jp/" target="_blank" rel="noopener">
        Bunpro
      </a>
      – grammar explanations and CEFR-oriented structure
    </li>
  </ul>

  <h2 class="sectionHeader">Data Sources & Open Resources</h2>

  <p class="aboutParagraph">
    WordSense relies on publicly available and open resources for linguistic
    data. All data is used with respect to the respective licenses.
  </p>

  <ul class="resourceList">
    <li>
      <a href="https://dictionaryapi.dev/" target="_blank" rel="noopener">
        dictionaryapi.dev
      </a>
      – free dictionary API for word definitions
    </li>
    <li>
      <a href="https://www.wiktionary.org/" target="_blank" rel="noopener">
        Wiktionary
      </a>
      – open lexical database
    </li>
    <li>
      <a
        href="https://www.esl-lounge.com/student/reference/c1-cefr-vocabulary-word-list.php"
        target="_blank"
        rel="noopener"
      >
        ESL Lounge – CEFR Vocabulary Lists
      </a>
    </li>
  </ul>

  <h2 class="sectionHeader">Technology</h2>

  <ul class="resourceList">
    <li><strong>Frontend:</strong> Svelte / SvelteKit</li>
    <li><strong>Backend:</strong> Node.js</li>
    <li><strong>Database:</strong> PostgreSQL</li>
  </ul>

  <h2 class="sectionHeader">Disclaimer</h2>

  <p class="aboutParagraph">
    WordSense is an educational project. While care is taken to ensure accuracy,
    definitions, examples, and grammar explanations may be incomplete or
    simplified. This project does not aim to replace professional language
    learning resources.
  </p>

  <footer class="aboutFooter">
    <p>
      © WordSense – Educational project.<br />
      All third-party content belongs to its respective owners.
    </p>
  </footer>
</section>

<style>
  .aboutContainer {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1.25rem;
    color: var(--color-text);
    font-size: var(--text-size-normal);
    line-height: 1.6;
  }

  h1 {
    font-size: var(--h2);
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  h2 {
	font-size: var(--text-size-bigger);
  }

  h2.sectionHeader {
    font-size: var(--text-size-bigger);
    margin-top: 2.5rem;
    border-bottom: 2px solid var(--color-bg-contrast);
    padding-bottom: 0.25rem;
  }

  .aboutParagraph {
    margin: 0.75rem 0;
	font-size: var(--text-size-normal);
  }

  .resourceList {
    margin-left: 1.25rem;
    list-style-type: disc;
  }

  .resourceList li {
    margin: 0.4rem 0;
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .aboutFooter {
    margin-top: 4rem;
    font-size: var(--text-size-small);
    color: var(--color-text-contrast);
  }
</style>
