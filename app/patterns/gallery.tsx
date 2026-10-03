"use client";

import { useMemo, useState } from "react";
import {
  Body,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  EmptyState,
  GenericFilter,
  Grid,
  GridItem,
  Heading,
  Inline,
  LoadingDialog,
  Stack,
  Status,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tag,
} from "codeddesign";

const rows = [
  { name: "Billing export", owner: "Ada", status: "live" as const },
  { name: "Invite flow", owner: "Ken", status: "pending" as const },
  { name: "Webhook retry", owner: "Noor", status: "error" as const },
];

export function PatternGallery() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);

  const visible = useMemo(
    () =>
      rows.filter((row) => {
        const matchesQuery = row.name.toLowerCase().includes(query.toLowerCase());
        const matchesStatus = status === "all" || row.status === status;
        return matchesQuery && matchesStatus;
      }),
    [query, status],
  );

  return (
    <Stack gap="xl">
      <Stack gap="xs">
        <Heading size="xxl" withoutMargins>
          Patterns
        </Heading>
        <Body>Composed layouts for the common product screens.</Body>
      </Stack>

      <Grid columns={3}>
        <GridItem>
          <Card>
            <CardHeader>
              <CardTitle>Workspace</CardTitle>
              <Tag status="active">Pro</Tag>
            </CardHeader>
            <CardContent>12 members · updated today</CardContent>
            <CardActions>
              <Button variant="subtle">Manage</Button>
            </CardActions>
          </Card>
        </GridItem>
        <GridItem>
          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
              <Tag status="success">Healthy</Tag>
            </CardHeader>
            <CardContent>64% of the monthly message quota.</CardContent>
            <CardActions>
              <Button variant="primary">Upgrade</Button>
            </CardActions>
          </Card>
        </GridItem>
        <GridItem>
          <EmptyState
            title="No integrations"
            description="Connect a source to start syncing events."
            action={<Button variant="primary">Add integration</Button>}
          />
        </GridItem>
      </Grid>

      <Stack gap="s">
        <GenericFilter
          query={query}
          onQueryChange={setQuery}
          status={status}
          onStatusChange={setStatus}
          statusOptions={[
            { label: "All", value: "all" },
            { label: "Live", value: "live" },
            { label: "Pending", value: "pending" },
            { label: "Error", value: "error" },
          ]}
        />
        {visible.length === 0 ? (
          <EmptyState title="Nothing matches" description="Try another filter." />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell header>Name</TableCell>
                <TableCell header>Owner</TableCell>
                <TableCell header>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visible.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>
                    <Status status={row.status}>{row.status}</Status>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Stack>

      <Inline>
        <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
        <Button variant="subtle" onClick={() => setLoadingOpen(true)}>
          Open loading dialog
        </Button>
      </Inline>
      <Dialog
        open={dialogOpen}
        title="Archive project"
        onClose={() => setDialogOpen(false)}
      >
        <Stack gap="m">
          <span>Archived projects stay readable and leave the active list.</span>
          <Inline>
            <Button variant="danger" onClick={() => setDialogOpen(false)}>
              Archive
            </Button>
            <Button variant="subtle" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
          </Inline>
        </Stack>
      </Dialog>
      <LoadingDialog
        open={loadingOpen}
        message="Publishing changes"
        onClose={() => setLoadingOpen(false)}
      />
    </Stack>
  );
}
