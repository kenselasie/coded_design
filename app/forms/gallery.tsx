"use client";

import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import {
  Body,
  Button,
  Checkbox,
  Form,
  FormActions,
  FormRow,
  Heading,
  SectionMessage,
  Select,
  Stack,
  Switch,
  TextArea,
  TextField,
} from "codeddesign";

const NARROW = "@media (max-width: 900px)";

const styles = stylex.create({
  board: {
    display: "grid",
    gridTemplateColumns: "minmax(280px, 380px) minmax(0, 1fr)",
    gap: "24px",
    alignItems: "start",
    [NARROW]: {
      gridTemplateColumns: "1fr",
    },
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    minWidth: 0,
  },
});

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function FormGallery() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [signInError, setSignInError] = useState<{ email?: string; password?: string }>({});
  const [signedIn, setSignedIn] = useState(false);

  const [first, setFirst] = useState("Ada");
  const [last, setLast] = useState("Lovelace");
  const [display, setDisplay] = useState("Ada");
  const [profileEmail, setProfileEmail] = useState("ada@studio.dev");
  const [role, setRole] = useState("designer");
  const [bio, setBio] = useState("I keep the component catalog honest.");
  const [listed, setListed] = useState(true);
  const [saved, setSaved] = useState(false);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [note, setNote] = useState("");
  const [inviteError, setInviteError] = useState("");
  const [invited, setInvited] = useState("");

  return (
    <Stack gap="xl">
      <Stack gap="xs">
        <Heading size="xxl" withoutMargins>
          Forms
        </Heading>
        <Body>
          Sign-in, profile, and invite forms built from the same fields. Submit
          them to see validation and confirmation.
        </Body>
      </Stack>

      <div {...stylex.props(styles.board)}>
        <div {...stylex.props(styles.stack)}>
          <Form
            title="Sign in"
            description="Use the workspace email you were invited with."
            onSubmit={() => {
              const next: { email?: string; password?: string } = {};
              if (!isEmail(email)) next.email = "Use a full address, like ada@studio.dev.";
              if (password.length < 8) {
                next.password = "Use at least 8 characters.";
              }
              setSignInError(next);
              setSignedIn(Object.keys(next).length === 0);
            }}
          >
            <TextField
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="ada@studio.dev"
              value={email}
              onChange={(value) => {
                setEmail(value);
                setSignedIn(false);
              }}
              error={signInError.email}
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(value) => {
                setPassword(value);
                setSignedIn(false);
              }}
              error={signInError.password}
              canReveal
              required
            />
            <Checkbox checked={remember} onChange={setRemember}>
              Keep me signed in on this device
            </Checkbox>
            {signedIn ? (
              <SectionMessage variant="success" title="Signed in">
                This preview stays in the browser. Nothing was sent.
              </SectionMessage>
            ) : null}
            <Button type="submit" variant="primary" fullWidth>
              Sign in
            </Button>
          </Form>

          <Form
            title="Invite a teammate"
            description="They get a link that expires in seven days."
            onSubmit={() => {
              if (!inviteEmail.trim()) {
                setInviteError("Enter an email so we know where to send the invite.");
                setInvited("");
                return;
              }
              if (!isEmail(inviteEmail)) {
                setInviteError("Use a full address, like noor@studio.dev.");
                setInvited("");
                return;
              }
              setInviteError("");
              setInvited(inviteEmail);
            }}
          >
            <TextField
              label="Email"
              type="email"
              name="invite-email"
              placeholder="noor@studio.dev"
              value={inviteEmail}
              onChange={(value) => {
                setInviteEmail(value);
                setInvited("");
              }}
              error={inviteError}
              required
            />
            <Select
              label="Role"
              name="invite-role"
              value={inviteRole}
              onChange={setInviteRole}
              options={[
                { label: "Member", value: "member" },
                { label: "Designer", value: "designer" },
                { label: "Admin", value: "admin" },
              ]}
            />
            <TextArea
              label="Note"
              name="note"
              placeholder="What should they start on?"
              hint="Optional. It rides along in the invite."
              value={note}
              onChange={setNote}
              rows={3}
            />
            {invited ? (
              <SectionMessage variant="success" title="Invite ready">
                {invited} can join as soon as you send this from a real workspace.
              </SectionMessage>
            ) : null}
            <FormActions>
              <Button
                type="button"
                variant="subtle"
                onClick={() => {
                  setInviteEmail("");
                  setNote("");
                  setInviteError("");
                  setInvited("");
                }}
              >
                Clear
              </Button>
              <Button type="submit" variant="primary">
                Send invite
              </Button>
            </FormActions>
          </Form>
        </div>

        <Form
          title="Your profile"
          description="This is what teammates see on comments and invites."
          onSubmit={() => setSaved(true)}
        >
          <FormRow>
            <TextField label="First name" name="first" value={first} onChange={setFirst} required />
            <TextField label="Last name" name="last" value={last} onChange={setLast} required />
          </FormRow>
          <TextField
            label="Display name"
            name="display"
            value={display}
            onChange={(value) => {
              setDisplay(value);
              setSaved(false);
            }}
            hint="Shown next to your comments."
          />
          <TextField
            label="Email"
            type="email"
            name="profile-email"
            autoComplete="email"
            value={profileEmail}
            onChange={setProfileEmail}
          />
          <TextField
            label="Workspace"
            name="workspace"
            defaultValue="North studio"
            disabled
            hint="Only an owner can change the workspace."
          />
          <Select
            label="Role"
            name="role"
            value={role}
            onChange={setRole}
            options={[
              { label: "Designer", value: "designer" },
              { label: "Engineer", value: "engineer" },
              { label: "Owner", value: "owner" },
            ]}
          />
          <TextArea
            label="Bio"
            name="bio"
            value={bio}
            onChange={(value) => {
              setBio(value);
              setSaved(false);
            }}
            rows={4}
          />
          <Switch checked={listed} onChange={setListed}>
            Show my profile in the directory
          </Switch>
          {saved ? (
            <SectionMessage variant="success" title="Profile saved">
              The catalog kept this in the page. Refresh to start over.
            </SectionMessage>
          ) : null}
          <FormActions>
            <Button
              type="button"
              variant="subtle"
              onClick={() => {
                setFirst("Ada");
                setLast("Lovelace");
                setDisplay("Ada");
                setProfileEmail("ada@studio.dev");
                setRole("designer");
                setBio("I keep the component catalog honest.");
                setListed(true);
                setSaved(false);
              }}
            >
              Reset
            </Button>
            <Button type="submit" variant="primary">
              Save profile
            </Button>
          </FormActions>
        </Form>
      </div>
    </Stack>
  );
}
