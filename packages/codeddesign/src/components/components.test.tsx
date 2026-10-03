import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Rating } from "./Rating";
import { Tab, TabList, TabPanel, Tabs } from "./Tabs";
import { TextField } from "./TextField";

describe("Button", () => {
  it("calls onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick while pending", async () => {
    const onClick = vi.fn();
    render(
      <Button isPending onClick={onClick}>
        Save
      </Button>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("Rating", () => {
  it("reports the chosen score", async () => {
    const onChange = vi.fn();
    render(<Rating label="Feel" value={2} onChange={onChange} />);
    await userEvent.click(screen.getByRole("radio", { name: "4 of 5" }));
    expect(onChange).toHaveBeenCalledWith(4);
  });
});

describe("Checkbox", () => {
  it("reports the next checked state", async () => {
    const onChange = vi.fn();
    render(
      <Checkbox checked={false} onChange={onChange}>
        Updates
      </Checkbox>,
    );
    await userEvent.click(screen.getByRole("checkbox", { name: "Updates" }));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe("TextField", () => {
  it("marks an invalid field and shows the error", () => {
    render(
      <TextField label="Email" value="ada" error="Use a full address, like ada@studio.dev." />,
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Use a full address, like ada@studio.dev.")).toBeInTheDocument();
  });
});

describe("Tabs", () => {
  it("shows the selected panel", async () => {
    render(
      <Tabs defaultValue="one">
        <TabList>
          <Tab value="one">One</Tab>
          <Tab value="two">Two</Tab>
        </TabList>
        <TabPanel value="one">First</TabPanel>
        <TabPanel value="two">Second</TabPanel>
      </Tabs>,
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("tab", { name: "Two" }));
    expect(screen.getByText("Second")).toBeInTheDocument();
  });
});
