"use client";

import * as stylex from "@stylexjs/stylex";
import { useState, type ComponentType } from "react";
import {
  Accordion,
  Alert,
  AlertDialog,
  AppSidebar,
  AspectRatio,
  Attachment,
  AttachmentGroup,
  Avatar,
  Badge,
  Body,
  Breadcrumb,
  Bullet,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardTitle,
  Carousel,
  ChartAxisLabel,
  ChartLegend,
  ChartTooltip,
  Checkbox,
  CircularProgress,
  Code,
  CodeBlock,
  Collapsible,
  Combobox,
  Command,
  ContextMenu,
  DataTable,
  DatePicker,
  Description,
  Detail,
  Dialog,
  DirectionProvider,
  Divider,
  Drawer,
  DropdownMenu,
  EmptyState,
  FaqSection,
  Field,
  Form,
  FormActions,
  GenericFilter,
  Grid,
  GridItem,
  Heading,
  HoverCard,
  Icon,
  Inline,
  InputGroup,
  InputGroupField,
  InputOTP,
  Item,
  ItemGroup,
  Label,
  LanguageSelect,
  LinearProgress,
  Link,
  LoadingDialog,
  Logo,
  Marker,
  Menubar,
  Message,
  MessageScroller,
  NavigationMenu,
  OverflowPopover,
  Overlay,
  Pagination,
  Popover,
  Questionnaire,
  Radio,
  Rating,
  Resizable,
  ScrollArea,
  SearchInput,
  SectionMessage,
  Select,
  Sheet,
  Shortcut,
  Skeleton,
  Slider,
  Spacer,
  SpeechBubble,
  SpeedDial,
  Spinner,
  Stack,
  Status,
  Sticker,
  SteppedHeader,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TabList,
  TabPanel,
  Tabs,
  Tag,
  TextArea,
  TextField,
  Title,
  Toggle,
  ToggleButton,
  Tooltip,
  Trace,
  TraceLine,
  useToast,
} from "codeddesign";
import { colors } from "codeddesign/tokens/colors.stylex";
import { font } from "codeddesign/tokens/typography.stylex";

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
  overlayBox: {
    minHeight: "88px",
    display: "flex",
    alignItems: "center",
  },
});

const cities = [
  { label: "Accra", value: "accra" },
  { label: "Lagos", value: "lagos" },
  { label: "Nairobi", value: "nairobi" },
];

const fileItems = [
  { label: "Duplicate" },
  { label: "Rename" },
  { separator: true as const, label: "sep" },
  { label: "Archive", destructive: true },
];

function PreviewButton() {
  return (
    <Inline>
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="danger">Danger</Button>
      <Button isPending>Saving</Button>
      <Button disabled>Disabled</Button>
    </Inline>
  );
}

function PreviewSpeedDial() {
  const toast = useToast();
  return (
    <SpeedDial
      actions={[
        { label: "New message", onClick: () => toast({ type: "info", message: "Message drafted" }) },
        { label: "Invite", onClick: () => toast({ type: "info", message: "Invite opened" }) },
      ]}
    />
  );
}

function PreviewIcon() {
  return (
    <Inline>
      <Icon name="spark" size={24} />
      <Icon name="check" size={24} />
      <Icon name="message" size={24} />
      <Icon name="home" size={24} />
      <Icon name="settings" size={24} />
    </Inline>
  );
}

function PreviewLogo() {
  return (
    <Inline>
      <Logo size="sm" />
      <Logo size="md" />
      <Logo size="lg" />
    </Inline>
  );
}

function PreviewTypography() {
  return (
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
        Inline <Code>code</Code>.
      </Body>
    </Stack>
  );
}

function PreviewSticker() {
  return (
    <Inline>
      <Sticker tone="pink">New</Sticker>
      <Sticker tone="blue">Soft</Sticker>
      <Sticker tone="yellow">Squish</Sticker>
      <Sticker tone="mint">Saved</Sticker>
    </Inline>
  );
}

function PreviewLink() {
  return <Link href="/components">All components</Link>;
}

function PreviewStack() {
  return (
    <Stack gap="xs">
      <Body>Stack lays blocks down the page.</Body>
      <Inline>
        <Tag status="active">Inline</Tag>
        <Tag status="subtle">sits beside</Tag>
      </Inline>
    </Stack>
  );
}

function PreviewGrid() {
  return (
    <Grid columns={3} gap="s">
      <GridItem>
        <Body>One</Body>
      </GridItem>
      <GridItem>
        <Body>Two</Body>
      </GridItem>
      <GridItem>
        <Body>Three</Body>
      </GridItem>
    </Grid>
  );
}

function PreviewSpacer() {
  return (
    <Inline>
      <Button>Before</Button>
      <Spacer size="xl" />
      <Button>After</Button>
    </Inline>
  );
}

function PreviewDivider() {
  return (
    <Stack gap="s">
      <Body>Above the rule.</Body>
      <Divider />
      <Body>Below the rule.</Body>
    </Stack>
  );
}

function PreviewResizable() {
  return (
    <Resizable
      left={<Body>Tokens live on this side.</Body>}
      right={<Body>Drag the handle to stretch the preview.</Body>}
    />
  );
}

function PreviewScrollArea() {
  return (
    <ScrollArea>
      {["Nunito", "Fredoka", "paper cream", "ink purple", "peach snow", "plush shadow"].map(
        (item) => (
          <Body key={item}>{item}</Body>
        ),
      )}
    </ScrollArea>
  );
}

function PreviewAspectRatio() {
  return (
    <AspectRatio ratio={16 / 9}>
      <div {...stylex.props(styles.ratioFill)}>16:9 preview frame</div>
    </AspectRatio>
  );
}

function PreviewOverlay() {
  const [open, setOpen] = useState(false);
  return (
    <div {...stylex.props(styles.overlayBox)}>
      <Button onClick={() => setOpen(true)}>Show overlay</Button>
      {open ? <Overlay onClick={() => setOpen(false)} /> : null}
    </div>
  );
}

function PreviewBreadcrumb() {
  return (
    <Breadcrumb
      items={[
        { label: "Workspace", href: "/" },
        { label: "Components", href: "/components" },
        { label: "Breadcrumb" },
      ]}
    />
  );
}

function PreviewDropdown() {
  return <DropdownMenu label="Actions" items={fileItems} />;
}

function PreviewMenubar() {
  return (
    <Menubar
      menus={[
        { label: "File", items: fileItems },
        { label: "Edit", items: [{ label: "Undo" }, { label: "Redo" }] },
      ]}
    />
  );
}

function PreviewPagination() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} pageCount={4} onChange={setPage} />;
}

function PreviewSteps() {
  const [step, setStep] = useState(1);
  return (
    <SteppedHeader
      current={step}
      onChange={setStep}
      steps={[{ label: "Details" }, { label: "Review" }, { label: "Done" }]}
    />
  );
}

function PreviewTabs() {
  return (
    <Tabs defaultValue="one">
      <TabList>
        <Tab value="one">Account</Tab>
        <Tab value="two">Billing</Tab>
      </TabList>
      <TabPanel value="one">Profile, password, and sessions.</TabPanel>
      <TabPanel value="two">Invoices and payment methods.</TabPanel>
    </Tabs>
  );
}

function PreviewNav() {
  return (
    <NavigationMenu
      items={[
        { label: "Overview", href: "/" },
        {
          label: "Library",
          links: [
            { title: "Components", href: "/components", hint: "Every control" },
            { title: "Forms", href: "/forms", hint: "Sign-in and profile" },
          ],
        },
      ]}
    />
  );
}

function PreviewSidebar() {
  return (
    <AppSidebar
      items={[
        { label: "Home", icon: "home" },
        { label: "Inbox", icon: "message" },
        { label: "People", icon: "user" },
        { label: "Settings", icon: "settings" },
      ]}
    />
  );
}

function PreviewOverflow() {
  return (
    <OverflowPopover label="More actions">
      <Stack gap="xs">
        <Button variant="subtle">Duplicate</Button>
        <Button variant="dangerSubtle">Archive</Button>
      </Stack>
    </OverflowPopover>
  );
}

function PreviewTextField() {
  return (
    <Stack gap="s">
      <TextField label="Display name" defaultValue="Ada" hint="Shown next to comments." />
      <TextField
        label="Work email"
        type="email"
        defaultValue="ada"
        error="Use a full address, like ada@studio.dev."
      />
      <TextArea label="Bio" defaultValue="I keep the catalog honest." rows={3} />
    </Stack>
  );
}

function PreviewSelect() {
  const [plan, setPlan] = useState("pro");
  return (
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
  );
}

function PreviewCheckbox() {
  const [checked, setChecked] = useState(true);
  return (
    <Checkbox checked={checked} onChange={setChecked}>
      Email me product updates
    </Checkbox>
  );
}

function PreviewSwitch() {
  const [enabled, setEnabled] = useState(true);
  return (
    <Switch checked={enabled} onChange={setEnabled}>
      Notifications
    </Switch>
  );
}

function PreviewRadio() {
  const [choice, setChoice] = useState("a");
  return (
    <Radio
      legend="Delivery"
      options={[
        { label: "Standard", value: "a" },
        { label: "Express", value: "b" },
      ]}
      value={choice}
      onChange={setChoice}
    />
  );
}

function PreviewSlider() {
  const [volume, setVolume] = useState(40);
  return <Slider label="Volume" value={volume} onChange={setVolume} />;
}

function PreviewCombobox() {
  const [city, setCity] = useState("accra");
  return <Combobox label="Studio city" options={cities} value={city} onChange={setCity} />;
}

function PreviewDatePicker() {
  const [day, setDay] = useState<Date | undefined>(new Date(2026, 9, 15));
  return <DatePicker label="Ship date" value={day} onChange={setDay} />;
}

function PreviewOtp() {
  const [otp, setOtp] = useState("");
  return <InputOTP label="Invite code" value={otp} onChange={setOtp} />;
}

function PreviewInputGroup() {
  return (
    <Stack gap="xs">
      <Label htmlFor="site">Workspace URL</Label>
      <InputGroup prefix="https://" suffix=".studio">
        <InputGroupField id="site" defaultValue="north" />
      </InputGroup>
    </Stack>
  );
}

function PreviewRating() {
  const [stars, setStars] = useState(3);
  return <Rating label="How does this feel?" value={stars} onChange={setStars} />;
}

function PreviewToggle() {
  const [bold, setBold] = useState(true);
  const [view, setView] = useState("list");
  return (
    <Stack gap="s">
      <Inline>
        <Toggle pressed={bold} onPressedChange={setBold}>
          Bold
        </Toggle>
      </Inline>
      <ToggleButton
        options={[
          { label: "List", value: "list" },
          { label: "Grid", value: "grid" },
        ]}
        value={view}
        onChange={setView}
      />
    </Stack>
  );
}

function PreviewAttachment() {
  return (
    <AttachmentGroup>
      <Attachment name="brief.pdf" meta="PDF · 1.4 MB" onRemove={() => undefined} />
      <Attachment name="moodboard.png" meta="Uploading · 64%" state="uploading" progress={64} />
      <Attachment name="notes.zip" meta="Upload failed. Try again." state="error" onRemove={() => undefined} />
    </AttachmentGroup>
  );
}

function PreviewForm() {
  return (
    <Form title="Sign in" description="Use the workspace email you were invited with.">
      <TextField label="Work email" type="email" name="email" defaultValue="ada@studio.dev" />
      <FormActions>
        <Button variant="primary">Sign in</Button>
      </FormActions>
    </Form>
  );
}

function PreviewField() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("en");
  return (
    <Stack gap="s">
      <Field label="Studio">
        <Body>North studio</Body>
      </Field>
      <SearchInput value={query} onChange={setQuery} />
      <LanguageSelect value={language} onChange={setLanguage} />
    </Stack>
  );
}

function PreviewAvatar() {
  return (
    <Inline>
      <Avatar name="Ada Lovelace" />
      <Avatar name="Ken Selasie" size="lg" />
    </Inline>
  );
}

function PreviewBadge() {
  return (
    <Inline>
      <Badge count={3}>
        <Button variant="primary">Inbox</Button>
      </Badge>
      <Badge count={12} tone="blue" />
    </Inline>
  );
}

function PreviewTag() {
  return (
    <Inline>
      <Tag status="success">Live</Tag>
      <Tag status="warning" variant="outlined">
        Review
      </Tag>
      <Tag status="danger">Failed</Tag>
    </Inline>
  );
}

function PreviewStatus() {
  return (
    <Inline>
      <Status status="live">Live</Status>
      <Status status="pending">Pending</Status>
      <Status status="error">Error</Status>
    </Inline>
  );
}

function PreviewCalendar() {
  const [day, setDay] = useState<Date | undefined>(new Date(2026, 9, 15));
  const [month, setMonth] = useState(new Date(2026, 9, 1));
  return <Calendar value={day} month={month} onMonthChange={setMonth} onChange={setDay} />;
}

function PreviewCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>North studio</CardTitle>
      </CardHeader>
      <CardContent>Active milestones for the savings dashboard.</CardContent>
      <CardActions>
        <Button variant="primary">Open</Button>
      </CardActions>
    </Card>
  );
}

function PreviewCarousel() {
  return (
    <Carousel
      slides={[
        <Body key="one">Stickers tilt until you hover.</Body>,
        <Body key="two">Buttons lift, then squish.</Body>,
        <Body key="three">Forms keep a 2px ink border.</Body>,
      ]}
    />
  );
}

function PreviewAccordion() {
  return (
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
      ]}
    />
  );
}

function PreviewPopover() {
  return (
    <Popover trigger={<Button variant="subtle">Dimensions</Button>}>
      <Body>Width 1440 · Height 900 · Padding 48.</Body>
    </Popover>
  );
}

function PreviewTooltip() {
  return (
    <Tooltip content="Shown on hover and focus">
      <Button variant="subtle">Hover for tooltip</Button>
    </Tooltip>
  );
}

function PreviewHoverCard() {
  return (
    <HoverCard trigger="Ada Lovelace">
      Designer on North studio. Last seen today on the invite flow.
    </HoverCard>
  );
}

function PreviewDataTable() {
  return (
    <DataTable
      columns={[
        { key: "name", header: "Name", filter: true },
        { key: "owner", header: "Owner" },
      ]}
      rows={[
        { name: "North studio", owner: "Ada" },
        { name: "Harbor", owner: "Noor" },
        { name: "Field notes", owner: "Ken" },
      ]}
    />
  );
}

function PreviewTable() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell header>Name</TableCell>
          <TableCell header>Owner</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>North studio</TableCell>
          <TableCell>Ada</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Harbor</TableCell>
          <TableCell>Noor</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function PreviewItem() {
  return (
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
        last
      />
    </ItemGroup>
  );
}

function PreviewCodeBlock() {
  return (
    <CodeBlock
      language="tsx"
      code={`import { Button } from "@kenselasie/codeddesign";\n\n<Button variant="primary">Sign in</Button>`}
    />
  );
}

function PreviewSpeechBubble() {
  return (
    <Stack gap="s">
      <SpeechBubble>Press a button and it dips.</SpeechBubble>
      <SpeechBubble tone="pink">Pink is for the cheerful notes.</SpeechBubble>
    </Stack>
  );
}

function PreviewEmpty() {
  return (
    <EmptyState
      title="Nothing matches"
      description="Try another filter."
      action={<Button variant="primary">Clear filters</Button>}
    />
  );
}

function PreviewMarker() {
  return (
    <Stack gap="s">
      <Marker icon="branch">Switched to release-candidate</Marker>
      <Marker icon="file">Explored 4 files</Marker>
      <Marker variant="separator">Today</Marker>
    </Stack>
  );
}

function PreviewChart() {
  return (
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
  );
}

function PreviewAlert() {
  return (
    <Stack gap="s">
      <Alert variant="success" title="Workspace saved">
        North studio is up to date.
      </Alert>
      <Alert variant="warning" title="Invite expires Friday">
        Send the link before the seven days run out.
      </Alert>
    </Stack>
  );
}

function PreviewSectionMessage() {
  return (
    <Stack gap="s">
      <SectionMessage variant="success" title="Published">
        The change is live for every workspace.
      </SectionMessage>
      <SectionMessage variant="warning" title="Review required">
        A teammate still needs to approve this.
      </SectionMessage>
    </Stack>
  );
}

function PreviewDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <Inline>
      <Button onClick={() => setDrawerOpen(true)}>Open drawer</Button>
      <Button variant="subtle" onClick={() => setSheetOpen(true)}>
        Open sheet
      </Button>
      <Drawer open={drawerOpen} title="Filters" onClose={() => setDrawerOpen(false)}>
        Narrow the table by owner or status.
      </Drawer>
      <Sheet open={sheetOpen} title="Member" onClose={() => setSheetOpen(false)}>
        Ada Lovelace · Designer.
      </Sheet>
    </Inline>
  );
}

function PreviewDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Rename workspace</Button>
      <Dialog open={open} title="Rename" onClose={() => setOpen(false)}>
        <TextField label="Name" defaultValue="North studio" />
      </Dialog>
    </>
  );
}

function PreviewAlertDialog() {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Archive workspace
      </Button>
      <AlertDialog
        open={open}
        title="Archive North studio?"
        actionLabel="Archive"
        destructive
        onCancel={() => setOpen(false)}
        onAction={() => {
          setOpen(false);
          toast({ type: "success", message: "Workspace archived in this preview" });
        }}
      >
        Comments stay. People lose access until you restore it.
      </AlertDialog>
    </>
  );
}

function PreviewLoadingDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Start export</Button>
      <LoadingDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function PreviewToast() {
  const toast = useToast();
  return (
    <Button variant="primary" onClick={() => toast({ type: "success", message: "Changes saved" })}>
      Show toast
    </Button>
  );
}

function PreviewProgress() {
  return (
    <Stack gap="s">
      <LinearProgress value={64} />
      <Inline>
        <CircularProgress value={72} />
        <CircularProgress />
      </Inline>
    </Stack>
  );
}

function PreviewSpinner() {
  return <Spinner size="large" />;
}

function PreviewSkeleton() {
  return (
    <Inline>
      <Skeleton shape="circle" width={40} />
      <Stack gap="xs">
        <Skeleton width={180} />
        <Skeleton width={120} />
      </Stack>
    </Inline>
  );
}

function PreviewMessage() {
  return (
    <MessageScroller>
      <Message from="assistant" name="CodedDesign">
        How can I help you today?
      </Message>
      <Message from="user" name="Ada">
        Show me a savings dashboard.
      </Message>
    </MessageScroller>
  );
}

function PreviewCommand() {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open command palette</Button>
      <Command
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(value) => toast({ type: "info", message: value })}
        items={[
          { label: "Go to Forms", value: "forms", shortcut: ["G", "F"] },
          { label: "Toggle theme", value: "theme", shortcut: ["T"] },
        ]}
      />
    </>
  );
}

function PreviewContextMenu() {
  const toast = useToast();
  return (
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
  );
}

function PreviewCollapsible() {
  return (
    <Collapsible label="Show install notes">
      Other projects import styles.css once, then the components.
    </Collapsible>
  );
}

function PreviewButtonGroup() {
  return (
    <ButtonGroup label="Document actions">
      <Button>Edit</Button>
      <Button variant="primary">Share</Button>
      <Button variant="subtle">Duplicate</Button>
    </ButtonGroup>
  );
}

function PreviewDirection() {
  return (
    <DirectionProvider direction="rtl">
      <Body>This block is right-to-left.</Body>
    </DirectionProvider>
  );
}

function PreviewFaq() {
  return (
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
  );
}

function PreviewQuestionnaire() {
  return (
    <Questionnaire
      items={[
        {
          name: "next",
          prompt: "What should we prototype next?",
          required: true,
          choices: [
            { value: "delegation", label: "Delegation" },
            { value: "questions", label: "Question prompts" },
          ],
        },
      ]}
    />
  );
}

function PreviewTrace() {
  return (
    <Trace>
      <TraceLine icon="search" title="Searched for minimumReleaseAge" description="8 results" />
      <TraceLine icon="terminal" title="Running pnpm build" status="running" />
      <TraceLine icon="spark" title="Run pnpm test" status="pending" />
    </Trace>
  );
}

function PreviewShortcut() {
  return <Shortcut keys={["⌘", "K"]} />;
}

function PreviewFilter() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  return (
    <GenericFilter
      query={query}
      onQueryChange={setQuery}
      status={status}
      onStatusChange={setStatus}
      statusOptions={[
        { label: "All", value: "all" },
        { label: "Live", value: "live" },
        { label: "Pending", value: "pending" },
      ]}
    />
  );
}

const previews: Record<string, ComponentType> = {
  button: PreviewButton,
  "speed-dial": PreviewSpeedDial,
  icon: PreviewIcon,
  logo: PreviewLogo,
  typography: PreviewTypography,
  sticker: PreviewSticker,
  link: PreviewLink,
  stack: PreviewStack,
  grid: PreviewGrid,
  spacer: PreviewSpacer,
  divider: PreviewDivider,
  resizable: PreviewResizable,
  "scroll-area": PreviewScrollArea,
  "aspect-ratio": PreviewAspectRatio,
  overlay: PreviewOverlay,
  breadcrumb: PreviewBreadcrumb,
  dropdown: PreviewDropdown,
  menubar: PreviewMenubar,
  pagination: PreviewPagination,
  steps: PreviewSteps,
  tabs: PreviewTabs,
  nav: PreviewNav,
  sidebar: PreviewSidebar,
  overflow: PreviewOverflow,
  "text-field": PreviewTextField,
  select: PreviewSelect,
  checkbox: PreviewCheckbox,
  switch: PreviewSwitch,
  radio: PreviewRadio,
  slider: PreviewSlider,
  combobox: PreviewCombobox,
  "date-picker": PreviewDatePicker,
  otp: PreviewOtp,
  "input-group": PreviewInputGroup,
  rating: PreviewRating,
  toggle: PreviewToggle,
  attachment: PreviewAttachment,
  form: PreviewForm,
  field: PreviewField,
  avatar: PreviewAvatar,
  badge: PreviewBadge,
  tag: PreviewTag,
  status: PreviewStatus,
  calendar: PreviewCalendar,
  card: PreviewCard,
  carousel: PreviewCarousel,
  accordion: PreviewAccordion,
  popover: PreviewPopover,
  tooltip: PreviewTooltip,
  "hover-card": PreviewHoverCard,
  "data-table": PreviewDataTable,
  table: PreviewTable,
  item: PreviewItem,
  "code-block": PreviewCodeBlock,
  "speech-bubble": PreviewSpeechBubble,
  empty: PreviewEmpty,
  marker: PreviewMarker,
  chart: PreviewChart,
  alert: PreviewAlert,
  "section-message": PreviewSectionMessage,
  drawer: PreviewDrawer,
  dialog: PreviewDialog,
  "alert-dialog": PreviewAlertDialog,
  "loading-dialog": PreviewLoadingDialog,
  toast: PreviewToast,
  progress: PreviewProgress,
  spinner: PreviewSpinner,
  skeleton: PreviewSkeleton,
  message: PreviewMessage,
  command: PreviewCommand,
  "context-menu": PreviewContextMenu,
  collapsible: PreviewCollapsible,
  "button-group": PreviewButtonGroup,
  direction: PreviewDirection,
  faq: PreviewFaq,
  questionnaire: PreviewQuestionnaire,
  trace: PreviewTrace,
  shortcut: PreviewShortcut,
  filter: PreviewFilter,
};

export function ComponentPreview({ id }: { id: string }) {
  const Preview = previews[id];
  if (!Preview) return <Body>No live preview for this export.</Body>;
  return <Preview />;
}
