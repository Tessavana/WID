# WID — Women+ in Design (Eindhoven)

Website for the Women+ in Design collective, founded by Sterre van de Boogaart.
Live at **https://tessavana.github.io/WID/** (GitHub Pages).

## Editing content (no code needed) — Pages CMS
1. Go to **https://app.pagescms.org** and sign in with GitHub.
2. Open the **Tessavana/WID** repository.
3. Pick a page in the menu (Home page, Events, Learn, Contact page, Settings), change text or upload/choose photos, and click **Save**.
4. Every save is a commit on GitHub; GitHub Pages republishes the site within about a minute.

To give someone editing access: on GitHub go to the repo → Settings → Collaborators → Add people.
They need their own (free) GitHub account.

## How it is built
- **Jekyll** (built into GitHub Pages — no setup needed).
- All texts and photo choices live in `_data/*.yml`; the HTML pages read from there.
- Uploaded photos go to `assets/img/`.
- `.pages.yml` describes the editing forms for Pages CMS.

| File | Page | Content file |
| --- | --- | --- |
| `index.html` | Home | `_data/home.yml` |
| `events.html` | Events | `_data/events.yml` |
| `learn.html` | Learn, connect, inspire | `_data/learn.yml` |
| `contact.html` | Contact | `_data/contact.yml` |
| (all pages) | Email, phone, links | `_data/site.yml` |

## Forms
The contact form and newsletter sign-ups are sent to the email in **Settings** via FormSubmit
(https://formsubmit.co). The very first submission sends a one-time confirmation email to that
address — click the link in it once, after that messages arrive directly in the mailbox.

## Post-it notes
- Home: the two green post-its on the quote bands (editable; leave the text empty to hide one).
- Contact: the yellow post-it is the working contact form.

## Own domain later?
Set `baseurl: ""` in `_config.yml` and add the domain under Settings → Pages → Custom domain.
