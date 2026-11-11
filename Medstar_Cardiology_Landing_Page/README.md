# Medstar cardiology landing page

Serve the contents of `dist/` over HTTPS. The page uses plain HTML, CSS, JavaScript and local WebP assets. Appointment calls and WhatsApp use +91 92814 43956. Medstar’s published 1800 425 0001 number is listed for hospital emergencies, and the emergency banner directs patients to 112. The callback form validates the name and mobile number, then prepares a WhatsApp message for the visitor to review and send.

## Connect the callback form

Deploy an appointment endpoint on Medstar’s domain that delivers leads to the team’s approved inbox or CRM. Add its path to the form’s `data-endpoint` attribute, for example `data-endpoint="/api/cardiology-callback"`.

The form sends a JSON POST with `name`, `mobile` in +91 format and `department`. Return a 2xx response with `{"accepted":true}` after the request is recorded. On failure the page retains the details and gives the visitor phone and WhatsApp options. Apply server-side validation, rate limiting and duplicate handling. If adapting the existing Rushmint Laravel contact form, implement the handler within that site using its normal session and CSRF protection.

Before directing ads to the page, verify the booking routes with the hospital team, run a test callback through to the appointment desk, and confirm that the landing page is publicly accessible on the hospital’s approved domain. Check which language the appointment desk can support and confirm current fees, schedules and insurance handling before adding any specifics.

## Patient research and design decisions

This is desk research. It combines general patient preference studies, cardiovascular shared decision-making guidance, a systematic review of second-opinion behavior and a review of local appointment pages. It does not include Medstar patient interviews, call recordings or search-term data.

| Expressed need | Underlying concern to validate with patients | Page response |
| --- | --- | --- |
| “Cardiologist near me” | Can I trust this specialist, get there and get a slot without several calls? | Branch and catchment above the fold, published clinician credentials, map directions and three contact paths. |
| “Review my ECG or echo” or “second opinion” | What does the report mean? Is the recommended next step necessary? | Explicit report and second-opinion copy, what happens at the visit and what to bring. |
| “Consultation fee, timing, insurance” | Will this mean an unexpected bill or a wasted trip? | Tell visitors how to confirm fees, timing and coverage through the appointment desk. |
| “Appointment for my parent” | Can I arrange this from my phone and help my parent understand the visit? | Explain how a family member can book and ask about language preference. |
| “Is this urgent?” | Is it safe to wait for a reply? | Visible emergency guidance and a direct 112 action, separate from outpatient booking. |

Local comparison: Manipal’s Vijayawada cardiology directory presents named doctors and answers timing questions. Practo’s Tadepalle results prominently show doctor profiles, experience and consultation fees where listed. For Medstar, surface the same decision factors with verified information and a clear path to confirm unknowns.

## Trust information to add when confirmed

The two specialist cards use Medstar’s published photos and profiles, and direct visitors to ask about availability for the named clinician. Confirm each doctor’s Tadepalle clinic schedule before displaying hours. Current consultation fees and a clear description of how the appointment team confirms slots are the next priorities. If available, add one short, approved patient account focused on the consultation experience. Use accreditation only with a current certificate for this branch and its relevant scope.

## Measurement

Use the hospital’s internal workflow to distinguish contact initiated, lead received, appointment confirmed and appointment attended. Track confirmed appointments by booking channel. A WhatsApp click is an intent signal. The form only emits `callback_request_accepted` after a configured endpoint acknowledges receipt. The page exposes interaction names through the first-party `medstar:booking-interaction` DOM event without contact details. Google Ads tags and enhanced conversions are unconfigured. Google’s customer data policies restrict uploading health-related conversion information for enhanced conversions and store sales measurement.

For the first search traffic, keep ad groups and copy close to cardiologist availability, a report or second opinion, or prevention and follow-up. Keep emergency and ambulance queries out of the outpatient appointment campaign. Compare the share of enquiries that become confirmed appointments across entry points before choosing the default booking channel.

## References

- Medstar cardiology and clinician details — https://medstarhospitals.rushmint.com/cardiology
- Hospital booking contacts and directions — https://www.medstarhospitals.com/
- Physician choice review — https://www.jmir.org/2024/1/e46073
- Patient preferences for appointment time, cost, travel and communication — https://pmc.ncbi.nlm.nih.gov/articles/PMC9463739/
- Outpatient waiting time and communication in India — https://pubmed.ncbi.nlm.nih.gov/27477932/
- Cardiovascular shared decision-making — https://www.jacc.org/doi/10.1016/j.jacadv.2024.100981
- Patient-initiated second opinions — https://bmjopen.bmj.com/content/11/9/e044033.full
- Appointment preparation — https://my.clevelandclinic.org/patients/information/appointments-checklist
- Local comparison — https://www.manipalhospitals.com/vijayawada/doctors-list/cardiology/ and https://www.practo.com/vijayawada/cardiologist/tadepalle
- Emergency symptoms and India’s 112 service — https://www.heart.org/en/health-topics/heart-attack/warning-signs-of-a-heart-attack and https://www.mha.gov.in/emergency-response-support-system-erss
- Google Ads customer data policy — https://support.google.com/adspolicy/answer/7475709
