/** Public GitHub repo that receives catalog bug reports. */
export const GITHUB_REPO =
  process.env.NEXT_PUBLIC_GITHUB_REPO ?? "kenselasie/coded_design";

export const GITHUB_BUG_TEMPLATE = "bug_report.yml";

export function githubNewBugUrl(fields: {
  title: string;
  whatHappened: string;
  expected: string;
  steps: string;
  area: string;
  component?: string;
  world: string;
  environment: string;
}): string {
  const params = new URLSearchParams({
    template: GITHUB_BUG_TEMPLATE,
    title: fields.title.trim() || "[Bug]: ",
    "what-happened": fields.whatHappened.trim(),
    expected: fields.expected.trim(),
    steps: fields.steps.trim(),
    area: fields.area,
    world: fields.world,
    environment: fields.environment.trim(),
  });
  if (fields.component?.trim()) {
    params.set("component", fields.component.trim());
  }
  return `https://github.com/${GITHUB_REPO}/issues/new?${params.toString()}`;
}

export function githubIssuesUrl(): string {
  return `https://github.com/${GITHUB_REPO}/issues`;
}
