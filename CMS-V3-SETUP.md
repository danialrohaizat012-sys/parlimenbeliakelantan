# MANDAT Kelantan CMS V3.0

## Current deployment
- Public: https://mandatbeliakelantan.binalab.my/
- Admin: https://mandatbeliakelantan.binalab.my/admin/
- Supabase project: znyruucppnhencsgyugu
- Tables: cms_admins, cms_candidates (14 seeded), cms_articles, cms_events
- Storage bucket: mandat-media (public reads, admin-only writes)

## Activate the one administrator
1. In Supabase Dashboard > Authentication > Users, create/invite the intended admin with a strong password and a verified email. Do not post passwords in chat.
2. In SQL Editor, after verifying the exact email, run this with the admin's real email:

```sql
insert into public.cms_admins(user_id)
select id from auth.users
where lower(email)=lower('YOUR_ADMIN_EMAIL')
  and email_confirmed_at is not null
on conflict (user_id) do nothing;
```

3. Confirm one admin is registered: `select count(*) from public.cms_admins;`
4. Open /admin/ and log in. No public registration exists.

## Security
- Only users in cms_admins can write content or upload media.
- No service_role key is used in frontend.
- All public tables and storage have row-level access policies.
- Draft articles/events are hidden from public visitors.
- Do not disable RLS or expose secret keys.
- Images: JPG/PNG/WebP, 5 MB maximum. For better speed compress to WebP first.

## Content workflow
- Candidate profile edits update Supabase; public pages fetch the latest names and photos.
- Published articles/events appear in berita.html and program.html.
- Existing local static content remains as a fallback if Supabase is unreachable.
- The uploaded Amiruddin image still needs to be uploaded from the admin interface.
- Browser visual QA and full end-to-end authenticated tests are still pending.
