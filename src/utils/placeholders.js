const svgContent = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <radialGradient id='g' cx='50%' cy='40%' r='65%'>
      <stop offset='0%' stop-color='#ff9900' stop-opacity='0.45'/>
      <stop offset='55%' stop-color='#ffcc00' stop-opacity='0.15'/>
      <stop offset='100%' stop-color='#0b0a07' stop-opacity='1'/>
    </radialGradient>
    <linearGradient id='t' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#ff9900'/>
      <stop offset='50%' stop-color='#ffcc00'/>
      <stop offset='100%' stop-color='#ff9900'/>
    </linearGradient>
  </defs>
  <rect width='100%' height='100%' fill='#0b0a07'/>
  <rect width='100%' height='100%' fill='url(#g)'/>
  <text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-family='Orbitron,Poppins,sans-serif' font-weight='900' font-size='170' fill='url(#t)'>Z</text>
</svg>`;

export const PLACEHOLDER_IMAGE = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;

export default PLACEHOLDER_IMAGE;
