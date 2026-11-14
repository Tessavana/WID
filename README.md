# WID — Women+ in Design (Eindhoven)

Website for the Women+ in Design collective, founded by Sterre van de Boogaart.
Plain HTML/CSS/JS — no build step. Open `index.html` in a browser, or host it on GitHub Pages
(Settings → Pages → Deploy from branch → `main` / root).

## Pages
| File | Page |
| --- | --- |
| `index.html` | Home — welcome, quotes, vision & mission, discover us, Instagram, newsletter |
| `events.html` | Events — search/filter, featured event, previous events |
| `learn.html` | Learn, connect, inspire — search/filter, learning cards, detail view |
| `contact.html` | Contact — contact form, details, newsletter, city tiles |

## Settings (`assets/js/config.js`)
- `email` — where the contact form and newsletter sign-ups are sent (via FormSubmit).
  **The first submission sends a one-time confirmation email to this address — click the link once**,
  after that every message lands directly in the mailbox.
- `instagramUrl` — Instagram profile for the Instagram section.
- `ticketsUrl` — ticket link for the featured event's "Buy Tickets" button.
- `cities.eindhoven / amsterdam / rotterdam` — link per city. When filled in, a real scannable QR
  code is generated on the contact page (until then a decorative placeholder is shown).

## Post-it notes
The post-its from the design are on the site as sticky notes:
- Home: "Opmerking over community" and "opmering over events" (green) on the two quote bands.
- Contact: the yellow post-it ("Kan hier een contactformulier komen…?") is implemented as a working
  contact form that sends messages straight to the mailbox.

## Placeholder content
Texts such as WELCOME, QUOTE, VISION/MISSION, "Title of event" and the phone number still follow the
design placeholders — replace them in the HTML files. Photos are in `assets/img/`.

## Fonts
Archivo Black (headings), Roboto (body/nav), Lora (contact details), Montserrat (labels) — loaded from Google Fonts.
