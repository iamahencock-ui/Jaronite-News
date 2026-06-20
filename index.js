export default {
  async fetch(request) {
    return new Response(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Jaronite News Inc. — DemocracyCraft Edition</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f4f4f4;
    color: #222;
  }

  header {
    background: #4b2e83;
    padding: 25px;
    text-align: center;
    color: white;
  }

  header img {
    width: 140px;
    margin-bottom: 10px;
  }

  nav {
    margin-top: 12px;
  }

  nav a {
    color: white;
    margin: 0 15px;
    text-decoration: none;
    font-weight: bold;
  }

  nav a:hover {
    text-decoration: underline;
  }

  .hero {
    background: #6a42b8;
    padding: 60px 20px;
    text-align: center;
    color: white;
  }

  .hero h1 {
    font-size: 2.8em;
    margin: 0;
  }

  .hero button {
    margin-top: 20px;
    padding: 12px 25px;
    font-size: 1.1em;
    border: none;
    border-radius: 6px;
    background: white;
    color: #4b2e83;
    cursor: pointer;
    font-weight: bold;
  }

  .hero button:hover {
    background: #e6e6e6;
  }

  .articles {
    padding: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .card {
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }

  .card img {
    width: 100%;
    border-radius: 8px;
    background: #ddd; /* placeholder background */
    height: 160px;
    object-fit: cover;
  }

  footer {
    background: #4b2e83;
    color: white;
    text-align: center;
    padding: 15px;
    margin-top: 40px;
  }
  a.card {
    text-decoration: none;
    color: inherit;
    display: block;
  }
</style>

</head>
<body>

<header>
  <img src="logo.png" alt="Jaronite News Logo">
  <h1>Jaronite News Inc.</h1>
  <p>Your Trusted Source for DemocracyCraft News</p>
  <nav>
    <a href="#">Home</a>
    <a href="#">Politics</a>
    <a href="#">Economy</a>
    <a href="#">Guides</a>
    <a href="#">About</a>
  </nav>
</header>

<section class="hero">
  <h1>Reporting the Pulse of DemocracyCraft</h1>
  <p>From elections to city events — we cover it all.</p>
  <button>Read Latest Headlines</button>
</section>

<section class="articles">

  <a href="mayoral-election.html" class="card">
    <img src="placeholder1.png" alt="Your Image Here">
    <h2>Mayoral Election Updates</h2>
    <p>Stay informed with the latest polling, debates, and candidate announcements across DemocracyCraft.</p>
  </a>

  <a href="city-projects.html" class="card">
    <img src="placeholder2.png" alt="Your Image Here">
    <h2>City Projects & Infrastructure</h2>
    <p>Breaking coverage on new roads, buildings, and public works shaping the future of the server.</p>
  </a>

  <a href="crime-justice.html" class="card">
    <img src="placeholder3.png" alt="Your Image Here">
    <h2>Crime & Justice Reports</h2>
    <p>Follow major police cases, court rulings, and legal changes affecting citizens.</p>
  </a>

  <a href="business-economy.html" class="card">
    <img src="placeholder4.png" alt="Your Image Here">
    <h2>Business & Economy</h2>
    <p>Market trends, job reports, and business highlights from across the DemocracyCraft world.</p>
  </a>

</section>

<footer>
  © 2026 Jaronite News Inc. — Covering DemocracyCraft with Integrity
</footer>

</body>
</html>
    `, {
      headers: { "content-type": "text/html" }
    });
  }
};
