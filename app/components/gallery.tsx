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
  Icon,
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
  TextArea,
  TextField,
  SpeedDial,
  Spinner,
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
import { Catalog } from "./catalog";
import { DemoChapter, DemoList, DemoSection as Section } from "./demo-section";
import { ComponentOverview } from "./overview";

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
      <ComponentOverview />

      <DemoList>
      <DemoChapter>Live demos</DemoChapter>

      <Section id="button" title="Button">
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

      <Section id="icon" title="Icon">
        <Inline>
          <Icon name="spark" size={24} />
          <Icon name="check" size={24} />
          <Icon name="message" size={24} />
          <Icon name="home" size={24} />
          <Icon name="settings" size={24} />
          <Icon name="calendar" size={24} />
        </Inline>
      </Section>

      <Section id="typography" title="Typography">
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

      <Section id="avatar" title="Avatar, tag, and status">
        <Inline>
          <Avatar name="Ada Lovelace" />
          <Avatar name="Ken Selasie" size="lg" />
          <span id="tag">
            <Tag status="success">Live</Tag>
          </span>
          <Tag status="warning" variant="outlined">
            Review
          </Tag>
          <Tag status="danger">Failed</Tag>
          <span id="status">
            <Status status="live">Live</Status>
          </span>
          <Status status="pending">Pending</Status>
          <Status status="error">Error</Status>
        </Inline>
      </Section>

      <Section id="stack" title="Stack">
        <Stack gap="xs">
          <Body>Stack lays blocks down the page.</Body>
          <Inline>
            <Tag status="active">Inline</Tag>
            <Tag status="subtle">sits beside</Tag>
          </Inline>
        </Stack>
      </Section>

      <Section id="selection" title="Selection">
        <Stack gap="s">
          <span id="checkbox">
            <Checkbox checked={checked} onChange={setChecked}>
              Email me product updates
            </Checkbox>
          </span>
          <span id="switch">
            <Switch checked={enabled} onChange={setEnabled}>
              Notifications
            </Switch>
          </span>
          <span id="radio">
          <Radio
            legend="Delivery"
            options={[
              { label: "Standard", value: "a" },
              { label: "Express", value: "b" },
            ]}
            value={choice}
            onChange={setChoice}
          />
          </span>
          <span id="toggle-group">
          <ToggleButton
            options={[
              { label: "List", value: "list" },
              { label: "Grid", value: "grid" },
            ]}
            value={view}
            onChange={setView}
          />
          </span>
          <span id="slider">
            <Slider label="Volume" value={volume} onChange={setVolume} />
          </span>
        </Stack>
      </Section>

      <Section id="inputs" title="Inputs">
        <Stack gap="s">
          <span id="text-field">
          <TextField
            label="Display name"
            defaultValue="Ada"
            placeholder="Ada"
            hint="Shown next to comments."
          />
          </span>
          <TextField
            label="Work email"
            type="email"
            defaultValue="ada"
            error="Use a full address, like ada@studio.dev."
          />
          <TextArea label="Bio" defaultValue="I keep the catalog honest." rows={3} />
          <Inline>
            <span id="search">
              <SearchInput value={query} onChange={setQuery} />
            </span>
            <span id="select">
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
            </span>
            <LanguageSelect value={language} onChange={setLanguage} />
          </Inline>
        </Stack>
      </Section>

      <Section id="tabs" title="Tabs">
        <Tabs defaultValue="one">
          <TabList>
            <Tab value="one">Account</Tab>
            <Tab value="two">Billing</Tab>
          </TabList>
          <TabPanel value="one">Profile, password, and sessions.</TabPanel>
          <TabPanel value="two">Invoices and payment methods.</TabPanel>
        </Tabs>
      </Section>

      <Section id="feedback-bar" title="Feedback">
        <Stack gap="s">
          <span id="section-message">
          <SectionMessage variant="success" title="Published">
            The change is live for every workspace.
          </SectionMessage>
          <SectionMessage variant="warning" title="Review required">
            A teammate still needs to approve this.
          </SectionMessage>
          </span>
          <Inline>
            <span id="tooltip">
            <Tooltip content="Shown on hover and focus">
              <Button variant="subtle">Hover for tooltip</Button>
            </Tooltip>
            </span>
            <span id="toast">
            <Button
              variant="primary"
              onClick={() =>
                toast({ type: "success", message: "Changes saved" })
              }
            >
              Show toast
            </Button>
            </span>
            <span id="shortcut">
              <Shortcut keys={["⌘", "K"]} />
            </span>
          </Inline>
          <span id="progress">
            <LinearProgress value={64} />
          </span>
          <Inline>
            <CircularProgress value={72} />
            <CircularProgress />
          </Inline>
        </Stack>
      </Section>

      <Section id="nav-pieces" title="Navigation pieces">
        <Stack gap="m">
          <span id="steps">
          <SteppedHeader
            current={step}
            onChange={setStep}
            steps={[{ label: "Details" }, { label: "Review" }, { label: "Done" }]}
          />
          </span>
          <span id="divider">
            <Divider />
          </span>
          <Inline>
            <span id="overflow">
            <OverflowPopover label="More actions">
              <Stack gap="xs">
                <Button variant="subtle">Duplicate</Button>
                <Button variant="dangerSubtle">Archive</Button>
              </Stack>
            </OverflowPopover>
            </span>
            <span id="speed-dial">
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
            </span>
          </Inline>
          <span id="faq">
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
          </span>
        </Stack>
      </Section>

      <Section id="stickers" title="Stickers and speech">
        <Stack gap="m">
          <Inline>
            <span id="sticker">
              <Sticker tone="pink">New</Sticker>
            </span>
            <Sticker tone="blue">Soft</Sticker>
            <Sticker tone="yellow">Squish</Sticker>
            <Sticker tone="mint">Saved</Sticker>
          </Inline>
          <span id="speech-bubble">
          <SpeechBubble>
            Press a button and it dips. Hover a sticker and it sits up straight.
          </SpeechBubble>
          <SpeechBubble tone="pink">Pink is for the cheerful notes.</SpeechBubble>
          </span>
        </Stack>
      </Section>

      <Section id="badge" title="Badge, rating, and pages">
        <Stack gap="m">
          <Inline>
            <Badge count={3}>
              <Button variant="primary">Inbox</Button>
            </Badge>
            <Badge count={12} tone="blue" />
            <Badge count={128} tone="ink" label="128 updates" />
          </Inline>
          <span id="rating">
            <Rating label="How does this feel?" value={stars} onChange={setStars} />
          </span>
          <span id="pagination">
            <Pagination page={page} pageCount={4} onChange={setPage} />
          </span>
          <span id="breadcrumb">
          <Breadcrumb
            items={[
              { label: "Workspace", href: "/" },
              { label: "Components", href: "/components" },
              { label: "Badge" },
            ]}
          />
          </span>
        </Stack>
      </Section>

      <Section id="skeleton" title="Loading">
        <Inline>
          <span id="spinner">
            <Spinner size="large" />
          </span>
          <Skeleton shape="circle" width={40} />
          <Stack gap="xs">
            <Skeleton width={180} />
            <Skeleton width={120} />
          </Stack>
          <Skeleton shape="block" width={160} />
        </Inline>
      </Section>

      <Section id="chart" title="Chart labels">
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

      <Catalog />
      </DemoList>
    </Stack>
  );
}
