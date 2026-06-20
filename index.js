export default {
  async fetch(request) {
    return new Response(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Jaronite News Inc. — DemocracyCraft Edition</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
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
