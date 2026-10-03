"use client";

import { useState } from "react";
import {
  Avatar,
  Badge,
  Body,
  Breadcrumb,
  Bullet,
  Button,
  ChartAxisLabel,
  ChartLegend,
  ChartTooltip,
  Checkbox,
  CircularProgress,
  Code,
  Description,
  Detail,
  Divider,
  FaqSection,
  Heading,
  Inline,
  LanguageSelect,
  LinearProgress,
  Link,
  OverflowPopover,
  Pagination,
  Radio,
  Rating,
  SearchInput,
  SectionMessage,
  Select,
  Shortcut,
  Skeleton,
  Slider,
  SpeechBubble,
  Spacer,
  TextArea,
  TextField,
  SpeedDial,
  Stack,
  Status,
  Sticker,
  SteppedHeader,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tag,
  Title,
  ToggleButton,
  Tooltip,
  useToast,
} from "codeddesign";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <Title>{title}</Title>
      <Spacer size="s" />
      {children}
    </section>
  );
}

export function ComponentGallery() {
  const toast = useToast();
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [choice, setChoice] = useState("a");
  const [view, setView] = useState("list");
  const [volume, setVolume] = useState(40);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("en");
  const [plan, setPlan] = useState("pro");
  const [step, setStep] = useState(1);
  const [stars, setStars] = useState(3);
  const [page, setPage] = useState(1);

  return (
    <Stack gap="xl">
      <Stack gap="xs">
        <Heading size="xxl" withoutMargins>
          Components
        </Heading>
        <Body>Controls, feedback, and typography used across the product.</Body>
      </Stack>

      <Section title="Button">
        <Inline>
          <Button>Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="dangerSubtle">Danger subtle</Button>
          <Button isPending>Saving</Button>
          <Button disabled>Disabled</Button>
          <Button selected>Selected</Button>
        </Inline>
      </Section>

      <Section title="Typography">
        <Stack gap="xs">
          <Heading size="l" withoutMargins>
            Heading
          </Heading>
          <Title>Title</Title>
          <Body>Body copy for explanations and longer reading.</Body>
          <Description>Description sits under a title as supporting text.</Description>
          <Detail>Detail label</Detail>
          <Bullet>A single bulleted point.</Bullet>
          <Body>
            Inline <Code>code</Code> and a{" "}
            <Link href="https://stylexjs.com">StyleX link</Link>.
          </Body>
        </Stack>
      </Section>

      <Section title="Avatar, tag, and status">
        <Inline>
          <Avatar name="Ada Lovelace" />
          <Avatar name="Ken Selasie" size="lg" />
          <Tag status="success">Live</Tag>
          <Tag status="warning" variant="outlined">
            Review
          </Tag>
          <Tag status="danger">Failed</Tag>
          <Status status="live">Live</Status>
          <Status status="pending">Pending</Status>
          <Status status="error">Error</Status>
        </Inline>
      </Section>

      <Section title="Selection">
        <Stack gap="s">
          <Checkbox checked={checked} onChange={setChecked}>
            Email me product updates
          </Checkbox>
          <Switch checked={enabled} onChange={setEnabled}>
            Notifications
          </Switch>
          <Radio
            legend="Delivery"
            options={[
              { label: "Standard", value: "a" },
              { label: "Express", value: "b" },
            ]}
            value={choice}
            onChange={setChoice}
          />
          <ToggleButton
            options={[
              { label: "List", value: "list" },
              { label: "Grid", value: "grid" },
            ]}
            value={view}
            onChange={setView}
          />
          <Slider label="Volume" value={volume} onChange={setVolume} />
        </Stack>
      </Section>

      <Section title="Inputs">
        <Stack gap="s">
          <TextField
            label="Display name"
            defaultValue="Ada"
            placeholder="Ada"
            hint="Shown next to comments."
          />
          <TextField
            label="Work email"
            type="email"
            defaultValue="ada"
            error="Use a full address, like ada@studio.dev."
          />
          <TextArea label="Bio" defaultValue="I keep the catalog honest." rows={3} />
          <Inline>
            <SearchInput value={query} onChange={setQuery} />
            <Select
              label="Plan"
              value={plan}
              onChange={setPlan}
              options={[
                { label: "Starter", value: "starter" },
                { label: "Pro", value: "pro" },
                { label: "Enterprise", value: "enterprise" },
              ]}
            />
            <LanguageSelect value={language} onChange={setLanguage} />
          </Inline>
        </Stack>
      </Section>

      <Section title="Tabs">
        <Tabs defaultValue="one">
          <TabList>
            <Tab value="one">Account</Tab>
            <Tab value="two">Billing</Tab>
          </TabList>
          <TabPanel value="one">Profile, password, and sessions.</TabPanel>
          <TabPanel value="two">Invoices and payment methods.</TabPanel>
        </Tabs>
      </Section>

      <Section title="Feedback">
        <Stack gap="s">
          <SectionMessage variant="success" title="Published">
            The change is live for every workspace.
          </SectionMessage>
          <SectionMessage variant="warning" title="Review required">
            A teammate still needs to approve this.
          </SectionMessage>
          <Inline>
            <Tooltip content="Shown on hover and focus">
              <Button variant="subtle">Hover for tooltip</Button>
            </Tooltip>
            <Button
              variant="primary"
              onClick={() =>
                toast({ type: "success", message: "Changes saved" })
              }
            >
              Show toast
            </Button>
            <Shortcut keys={["⌘", "K"]} />
          </Inline>
          <LinearProgress value={64} />
          <Inline>
            <CircularProgress value={72} />
            <CircularProgress />
          </Inline>
        </Stack>
      </Section>

      <Section title="Navigation pieces">
        <Stack gap="m">
          <SteppedHeader
            current={step}
            onChange={setStep}
            steps={[{ label: "Details" }, { label: "Review" }, { label: "Done" }]}
          />
          <Divider />
          <Inline>
            <OverflowPopover label="More actions">
              <Stack gap="xs">
                <Button variant="subtle">Duplicate</Button>
                <Button variant="dangerSubtle">Archive</Button>
              </Stack>
            </OverflowPopover>
            <SpeedDial
              actions={[
                {
                  label: "New message",
                  onClick: () => toast({ type: "info", message: "Message drafted" }),
                },
                {
                  label: "Invite",
                  onClick: () => toast({ type: "info", message: "Invite opened" }),
                },
              ]}
            />
          </Inline>
          <FaqSection
            items={[
              {
                question: "Where do tokens live?",
                answer: "Color, type, space, and shadow tokens are StyleX variables.",
              },
              {
                question: "How do I theme a subtree?",
                answer: "Apply the dark theme with stylex.createTheme on a parent.",
              },
            ]}
          />
        </Stack>
      </Section>

      <Section title="Stickers and speech">
        <Stack gap="m">
          <Inline>
            <Sticker tone="pink">New</Sticker>
            <Sticker tone="blue">Soft</Sticker>
            <Sticker tone="yellow">Squish</Sticker>
            <Sticker tone="mint">Saved</Sticker>
          </Inline>
          <SpeechBubble>
            Press a button and it dips. Hover a sticker and it sits up straight.
          </SpeechBubble>
          <SpeechBubble tone="pink">Pink is for the cheerful notes.</SpeechBubble>
        </Stack>
      </Section>

      <Section title="Badge, rating, and pages">
        <Stack gap="m">
          <Inline>
            <Badge count={3}>
              <Button variant="primary">Inbox</Button>
            </Badge>
            <Badge count={12} tone="blue" />
            <Badge count={128} tone="ink" label="128 updates" />
          </Inline>
          <Rating label="How does this feel?" value={stars} onChange={setStars} />
          <Pagination page={page} pageCount={4} onChange={setPage} />
          <Breadcrumb
            items={[
              { label: "Workspace", href: "/" },
              { label: "Components", href: "/components" },
              { label: "Badge" },
            ]}
          />
        </Stack>
      </Section>

      <Section title="Loading">
        <Inline>
          <Skeleton shape="circle" width={40} />
          <Stack gap="xs">
            <Skeleton width={180} />
            <Skeleton width={120} />
          </Stack>
          <Skeleton shape="block" width={160} />
        </Inline>
      </Section>

      <Section title="Chart labels">
        <Stack gap="s">
          <ChartLegend
            items={[
              { label: "Sent", color: "blue" },
              { label: "Delivered", color: "green" },
              { label: "Failed", color: "pink" },
            ]}
          />
          <Inline>
            <ChartTooltip label="Monday" value="1,204" />
            <ChartAxisLabel>Apr</ChartAxisLabel>
          </Inline>
        </Stack>
      </Section>
    </Stack>
  );
}
