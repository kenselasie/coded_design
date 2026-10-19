"use client";

import { useState } from "react";
import {
  Alert,
  Body,
  Button,
  Form,
  FormActions,
  Link,
  Select,
  Stack,
  TextArea,
  TextField,
} from "codeddesign";
import { agentGuide } from "codeddesign/agent";
import { githubIssuesUrl, githubNewBugUrl } from "@/lib/github";

const areaOptions = [
  { label: "Component / package", value: "Component / package" },
  { label: "Catalog site", value: "Catalog site" },
  { label: "Theme / palette", value: "Theme / palette" },
  { label: "Agent / recipes / llms.txt", value: "Agent / recipes / llms.txt" },
  { label: "Other", value: "Other" },
];

const worldOptions = [
  { label: "CodedCartoony", value: "CodedCartoony" },
  { label: "CodedMarker", value: "CodedMarker" },
  { label: "CodedEdwadzi", value: "CodedEdwadzi" },
  { label: "Not sure", value: "Not sure" },
];

export function ReportBugForm() {
  const [title, setTitle] = useState("[Bug]: ");
  const [whatHappened, setWhatHappened] = useState("");
  const [expected, setExpected] = useState("");
  const [steps, setSteps] = useState("");
  const [area, setArea] = useState(areaOptions[0].value);
  const [component, setComponent] = useState("");
  const [world, setWorld] = useState(worldOptions[2].value);
  const [environment, setEnvironment] = useState(
    `Browser · OS · ${agentGuide.package} ${agentGuide.version}`,
  );
  const [opened, setOpened] = useState(false);

  const canSubmit =
    whatHappened.trim().length > 0 &&
    expected.trim().length > 0 &&
    steps.trim().length > 0 &&
    environment.trim().length > 0;

  function openOnGitHub() {
    if (!canSubmit) return;
    const url = githubNewBugUrl({
      title,
      whatHappened,
      expected,
      steps,
      area,
      component,
      world,
      environment,
    });
    setOpened(true);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <Stack gap="m">
      <Form
        title="Bug report"
        description="Fill this in, then continue on GitHub. Reports land as public issues — searchable, and no account is needed on this site."
        onSubmit={openOnGitHub}
      >
        <TextField label="Title" name="title" value={title} onChange={setTitle} />
        <Select label="Where?" value={area} onChange={setArea} options={areaOptions} />
        <TextField
          label="Component or page"
          name="component"
          value={component}
          onChange={setComponent}
          placeholder="Select, /components/tabs…"
          hint="Optional"
        />
        <Select label="World" value={world} onChange={setWorld} options={worldOptions} />
        <TextArea
          label="What happened?"
          name="what-happened"
          value={whatHappened}
          onChange={setWhatHappened}
          rows={4}
          required
        />
        <TextArea
          label="What did you expect?"
          name="expected"
          value={expected}
          onChange={setExpected}
          rows={3}
          required
        />
        <TextArea
          label="Steps to reproduce"
          name="steps"
          value={steps}
          onChange={setSteps}
          rows={4}
          required
        />
        <TextField
          label="Environment"
          name="environment"
          value={environment}
          onChange={setEnvironment}
          required
        />
        <FormActions>
          <Button type="submit" variant="primary" disabled={!canSubmit}>
            Continue on GitHub
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => window.open(githubIssuesUrl(), "_blank", "noopener,noreferrer")}
          >
            Browse issues
          </Button>
        </FormActions>
      </Form>
      {opened ? (
        <Alert variant="success" title="Opened GitHub">
          Finish the issue there and attach screenshots if you have them. If
          nothing opened, allow pop-ups or use Browse issues.
        </Alert>
      ) : (
        <Body>
          Issues live at <Link href={githubIssuesUrl()}>{githubIssuesUrl()}</Link>.
        </Body>
      )}
    </Stack>
  );
}
