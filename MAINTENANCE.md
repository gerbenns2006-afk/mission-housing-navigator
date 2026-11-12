# Keeping the resource guide current

The repository owner and designated project maintainers are responsible for listing corrections. Mission College and the listed providers do not operate this independent guide or monitor its reports. The public correction form creates a GitHub issue for a maintainer to review; it does not contact a housing provider or request assistance. Submission requires a GitHub account. No automated review or response-time promise is in place.

## Routine review

- Check open correction reports at least weekly as a maintenance practice. Review reported changes to intake numbers, safety contacts, and closed programs first.
- Review every resource against its official sources at least every 90 days, and sooner when a report or provider announcement indicates a change. The site marks checks older than 90 days as due for review; that is a freshness signal, not a claim that the resource has closed.
- Check the public provider website or a government/college source for the exact program, ages, service area, intake route, location type, and any preparation guidance. A functioning link alone is not a substantive review. If the information cannot be verified, retain the original review date and clearly mark the uncertain detail.
- Do not describe funds, vacancies, appointment slots, or waiting lists as currently available unless the provider explicitly confirms that specific fact and the guide states the relevant date. Source review dates are not availability checks.

## Resolving a correction

1. Identify the listing by its resource ID. Records live in `data/resources.js`, `data/hps.js`, and `data/assessments.js`; HPS display IDs add the `hps-` prefix in `app.js`.
2. Check the report against an official source. Do not treat an issue report as confirmation by itself. Record the supporting public URL in the correction commit or pull request.
3. Update the affected record and its `sources`. Set that record's `checked` value to the date a substantive source review was completed, using `YYYY-MM-DD`. Use an explicit per-record override when a shared date applies to the rest of a dataset; never advance the date for unreviewed records.
4. Run the build and relevant checks, review the affected detail panel and plan, then publish. Confirm the corrected listing is present on the public site.
5. Close the issue with a link to the correction or explain what could not be confirmed. Do not promise a service outcome or individual eligibility.

## Public-report privacy

Only the public resource name, resource ID, and linked official URL are prefilled in correction links. Student choices, contact statuses, preparation selections, and housing circumstances must never be included. The form warns users that reports are public and must contain listing details only.

If someone posts personal information, a maintainer should promptly remove or redact it using GitHub's moderation controls and avoid copying it into commits, issue replies, or support requests. Use the provider's own intake route for individual assistance; the project is not a case-management service.

The form is at `.github/ISSUE_TEMPLATE/resource-correction.yml`. Its `resource` and `source` field IDs match `correctionUrl()` in `resource-review.js`; preserve that pairing when editing the form. GitHub documents [issue form query prefills](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-an-issue#creating-an-issue-from-a-url-query).
