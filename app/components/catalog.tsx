"use client";

import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { colors } from "codeddesign/tokens/colors.stylex";
import { font } from "codeddesign/tokens/typography.stylex";
import {
  Accordion,
  Alert,
  AlertDialog,
  AppSidebar,
  AspectRatio,
  Attachment,
  AttachmentGroup,
  Body,
  Button,
  ButtonGroup,
  Calendar,
  Carousel,
  CodeBlock,
  Collapsible,
  Combobox,
  Command,
  ContextMenu,
  DataTable,
  DatePicker,
  DirectionProvider,
  Drawer,
  DropdownMenu,
  HoverCard,
  Icon,
  Inline,
  InputGroup,
  InputGroupField,
  InputOTP,
  Item,
  ItemGroup,
  Label,
  Marker,
  Menubar,
  Message,
  MessageScroller,
  NavigationMenu,
  Popover,
  Questionnaire,
  Resizable,
  ScrollArea,
  Sheet,
  Stack,
  Toggle,
  Trace,
  TraceLine,
  useToast,
} from "codeddesign";
import { DemoSection as Section } from "./demo-section";

const styles = stylex.create({
  ratioFill: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.pinkLight,
    color: colors.onPastel,
    fontFamily: font.family,
    fontSize: font.s,
  },
});

const cities = [
  { label: "Accra", value: "accra" },
  { label: "Lagos", value: "lagos" },
  { label: "Nairobi", value: "nairobi" },
  { label: "Cape Town", value: "cape-town" },
];

export function Catalog() {
  const toast = useToast();
  const [alertOpen, setAlertOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [city, setCity] = useState("accra");
  const [otp, setOtp] = useState("");
  const [day, setDay] = useState<Date | undefined>(new Date(2026, 9, 15));
  const [month, setMonth] = useState(new Date(2026, 9, 1));
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);

  return (
    <>
      <Section id="accordion" title="Accordion">
        <Accordion
          items={[
            {
              title: "Where do tokens live?",
              content: "Color, type, space, and shadow tokens are StyleX variables.",
            },
            {
              title: "How do I theme a subtree?",
              content: "Apply the dark theme with stylex.createTheme on a parent.",
            },
            {
              title: "Can other apps install this?",
              content: "Yes. npm install @kenselasie/codeddesign from the public registry.",
            },
          ]}
        />
      </Section>

      <Section id="alert" title="Alert">
        <Stack gap="s">
          <Alert variant="info" title="Workspace saved">
            Everyone in North studio can see this catalog now.
          </Alert>
          <Alert variant="warning" title="Invite expires Friday">
            Send the link before the seven days run out.
          </Alert>
        </Stack>
      </Section>

      <Section id="alert-dialog" title="Alert Dialog">
        <Button variant="danger" onClick={() => setAlertOpen(true)}>
          Archive workspace
        </Button>
        <AlertDialog
          open={alertOpen}
          title="Archive North studio?"
          actionLabel="Archive"
          destructive
          onCancel={() => setAlertOpen(false)}
          onAction={() => {
            setAlertOpen(false);
            toast({ type: "success", message: "Workspace archived in this preview" });
          }}
        >
          Comments stay. People lose access until you restore it.
        </AlertDialog>
      </Section>

      <Section id="aspect-ratio" title="Aspect Ratio">
        <AspectRatio ratio={16 / 9}>
          <div {...stylex.props(styles.ratioFill)}>16:9 preview frame</div>
        </AspectRatio>
      </Section>

      <Section id="attachment" title="Attachment">
        <AttachmentGroup>
          <Attachment name="brief.pdf" meta="PDF · 1.4 MB" onRemove={() => undefined} />
          <Attachment
            name="moodboard.png"
            meta="Uploading · 64%"
            state="uploading"
            progress={64}
          />
          <Attachment
            name="notes.zip"
            meta="Upload failed. Try again."
            state="error"
            onRemove={() => undefined}
          />
        </AttachmentGroup>
      </Section>

      <Section id="button-group" title="Button Group">
        <ButtonGroup label="Document actions">
          <Button>Edit</Button>
          <Button variant="primary">Share</Button>
          <Button variant="subtle">Duplicate</Button>
        </ButtonGroup>
      </Section>

      <Section id="calendar" title="Calendar">
        <Calendar value={day} month={month} onMonthChange={setMonth} onChange={setDay} />
      </Section>

      <Section id="carousel" title="Carousel">
        <Carousel
          slides={[
            <Body key="one">Stickers tilt until you hover. Buttons lift, then squish.</Body>,
            <Body key="two">Forms keep a 2px ink border and a Show control on passwords.</Body>,
            <Body key="three">Publish a new version when you want other apps to catch up.</Body>,
          ]}
        />
      </Section>

      <Section id="code-block" title="Code Block">
        <CodeBlock
          language="tsx"
          code={`import { Button } from "@kenselasie/codeddesign";\n\n<Button variant="primary">Sign in</Button>`}
        />
      </Section>

      <Section id="collapsible" title="Collapsible">
        <Collapsible label="Show install notes">
          Other projects import styles.css once, then the components. They do not need the StyleX compiler.
        </Collapsible>
      </Section>

      <Section id="combobox" title="Combobox">
        <Combobox label="Studio city" options={cities} value={city} onChange={setCity} />
      </Section>

      <Section id="command" title="Command">
        <Button onClick={() => setCommandOpen(true)}>Open command palette</Button>
        <Command
          open={commandOpen}
          onClose={() => setCommandOpen(false)}
          onSelect={(value) => toast({ type: "info", message: value })}
          items={[
            { label: "Go to Forms", value: "forms", shortcut: ["G", "F"] },
            { label: "Go to Patterns", value: "patterns", shortcut: ["G", "P"] },
            { label: "Toggle theme", value: "theme", shortcut: ["T"] },
          ]}
        />
      </Section>

      <Section id="context-menu" title="Context Menu">
        <ContextMenu
          items={[
            { label: "Duplicate", onSelect: () => toast({ type: "info", message: "Duplicated" }) },
            { label: "Rename" },
            { separator: true, label: "sep" },
            {
              label: "Archive",
              destructive: true,
              onSelect: () => toast({ type: "warning", message: "Archived" }),
            },
          ]}
        >
          <Body>Right-click this paragraph for a menu.</Body>
        </ContextMenu>
      </Section>

      <Section id="data-table" title="Data Table">
        <DataTable
          columns={[
            { key: "name", header: "Name", filter: true },
            { key: "owner", header: "Owner" },
            { key: "status", header: "Status" },
          ]}
          rows={[
            { name: "Billing export", owner: "Ada", status: "Live" },
            { name: "Invite flow", owner: "Ken", status: "Pending" },
            { name: "Webhook retry", owner: "Noor", status: "Error" },
          ]}
        />
      </Section>

      <Section id="date-picker" title="Date Picker">
        <DatePicker label="Ship date" value={day} onChange={setDay} />
      </Section>

      <Section id="direction" title="Direction">
        <DirectionProvider direction="rtl">
          <Body>This block is right-to-left. Arabic and Hebrew layouts use the same provider.</Body>
        </DirectionProvider>
      </Section>

      <Section id="drawer" title="Drawer and Sheet">
        <Inline>
          <Button onClick={() => setDrawerOpen(true)}>Open drawer</Button>
          <Button variant="subtle" onClick={() => setSheetOpen(true)}>
            Open sheet
          </Button>
        </Inline>
        <Drawer open={drawerOpen} title="Filters" onClose={() => setDrawerOpen(false)}>
          Narrow the table by owner or status. This panel arrives from the bottom.
        </Drawer>
        <Sheet open={sheetOpen} title="Member" onClose={() => setSheetOpen(false)}>
          Ada Lovelace · Designer. Sheets arrive from the side.
        </Sheet>
      </Section>

      <Section id="dropdown" title="Dropdown Menu">
        <DropdownMenu
          label="Actions"
          items={[
            { label: "Duplicate", shortcut: ["⌘", "D"] },
            { label: "Move to…" },
            { separator: true, label: "sep" },
            { label: "Delete", destructive: true },
          ]}
        />
      </Section>

      <Section id="hover-card" title="Hover Card">
        <HoverCard trigger="Ada Lovelace">
          Designer on North studio. Last seen today on the invite flow.
        </HoverCard>
      </Section>

      <Section id="input-group" title="Input Group">
        <Label htmlFor="site">Workspace URL</Label>
        <InputGroup prefix="https://" suffix=".studio">
          <InputGroupField id="site" defaultValue="north" />
        </InputGroup>
      </Section>

      <Section id="otp" title="Input OTP">
        <InputOTP label="Invite code" value={otp} onChange={setOtp} />
      </Section>

      <Section id="item" title="Item">
        <ItemGroup>
          <Item
            media={<Icon name="user" />}
            title="Ada Lovelace"
            description="Designer · last seen today"
            actions={<Button size="small">Message</Button>}
          />
          <Item
            media={<Icon name="user" />}
            title="Noor Hassan"
            description="Engineer · reviewing webhooks"
            actions={<Button size="small" variant="subtle">Assign</Button>}
            last
          />
        </ItemGroup>
      </Section>

      <Section id="marker" title="Marker">
        <Stack gap="s">
          <Marker icon="branch">Switched to release-candidate</Marker>
          <Marker icon="file">Explored 4 files</Marker>
          <Marker variant="separator">Today</Marker>
        </Stack>
      </Section>

      <Section id="menubar" title="Menubar">
        <Menubar
          menus={[
            {
              label: "File",
              items: [{ label: "New" }, { label: "Open…" }, { separator: true, label: "sep" }, { label: "Close" }],
            },
            {
              label: "Edit",
              items: [{ label: "Undo" }, { label: "Redo" }],
            },
          ]}
        />
      </Section>

      <Section id="message" title="Message">
        <MessageScroller>
          <Message from="assistant" name="CodedDesign">
            Buttons lift, then squish when you press them.
          </Message>
          <Message from="user" name="Ada">
            Keep that. Can we have forms too?
          </Message>
          <Message from="assistant" name="CodedDesign">
            Sign-in, invite, and profile are on the Forms page.
          </Message>
        </MessageScroller>
      </Section>

      <Section id="nav" title="Navigation Menu">
        <NavigationMenu
          items={[
            { label: "Overview", href: "/" },
            {
              label: "Library",
              links: [
                { title: "Components", href: "/components", hint: "Controls and feedback" },
                { title: "Patterns", href: "/patterns", hint: "Cards, tables, dialogs" },
                { title: "Forms", href: "/forms", hint: "Sign-in and profile" },
              ],
            },
          ]}
        />
      </Section>

      <Section id="popover" title="Popover">
        <Popover trigger={<Button variant="subtle">Dimensions</Button>}>
          <Body>Width 1440 · Height 900 · Padding 48.</Body>
        </Popover>
      </Section>

      <Section id="questionnaire" title="Questionnaire">
        <Questionnaire
          items={[
            {
              name: "next",
              prompt: "What should we prototype next?",
              description: "Choose a direction for the next catalog pass.",
              required: true,
              choices: [
                { value: "delegation", label: "Delegation", hint: "Hand work to a specialist." },
                { value: "questions", label: "Question prompts", hint: "Choices while the interface waits." },
                { value: "both", label: "Both together" },
              ],
            },
            {
              name: "depth",
              prompt: "How much detail should it include?",
              required: false,
              choices: [
                { value: "focused", label: "Focused" },
                { value: "complete", label: "Complete flow" },
              ],
            },
          ]}
        />
      </Section>

      <Section id="resizable" title="Resizable">
        <Resizable
          left={<Body>Tokens, type, and color live on this side.</Body>}
          right={<Body>The preview pane stretches as you drag the handle.</Body>}
        />
      </Section>

      <Section id="scroll-area" title="Scroll Area">
        <ScrollArea>
          {["Nunito", "Fredoka", "paper cream", "ink purple", "peach snow", "plush shadow"].map(
            (item) => (
              <Body key={item}>{item}</Body>
            ),
          )}
        </ScrollArea>
      </Section>

      <Section id="sidebar" title="Sidebar">
        <AppSidebar
          items={[
            { label: "Home", icon: "home" },
            { label: "Inbox", icon: "message" },
            { label: "People", icon: "user" },
            { label: "Settings", icon: "settings" },
          ]}
        />
      </Section>

      <Section id="toggle" title="Toggle">
        <Inline>
          <Toggle pressed={bold} onPressedChange={setBold}>
            Bold
          </Toggle>
          <Toggle pressed={italic} onPressedChange={setItalic}>
            Italic
          </Toggle>
        </Inline>
      </Section>

      <Section id="trace" title="Trace">
        <Trace>
          <TraceLine icon="search" title="Searched for minimumReleaseAge" description="8 results" />
          <TraceLine
            icon="terminal"
            title="Ran node --version"
            detail={"$ node --version\nv24.18.0"}
          />
          <TraceLine icon="terminal" title="Running pnpm build" status="running" />
          <TraceLine
            icon="xCircle"
            title="Failed to run pnpm install --frozen-lockfile"
            status="error"
            detail="The lockfile is behind package.json. Run pnpm install and commit it."
          />
          <TraceLine icon="spark" title="Run pnpm test" status="pending" />
        </Trace>
      </Section>
    </>
  );
}
