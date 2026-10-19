import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchInput } from "./fields";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Rating } from "./Rating";
import { Tab, TabList, TabPanel, Tabs } from "./Tabs";
import { TextField } from "./TextField";
import { Accordion } from "./Accordion";

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

describe("SearchInput", () => {
  it("keeps the accessible name when the label is hidden", async () => {
    const onChange = vi.fn();
    render(
      <SearchInput
        label="Find a component"
        hideLabel
        shape="pill"
        value=""
        onChange={onChange}
      />,
    );
    const box = screen.getByRole("searchbox", { name: "Find a component" });
    await userEvent.type(box, "a");
    expect(onChange).toHaveBeenCalledWith("a");
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
      <TextField label="Email" value="ada" error="Use a full address, like alex.com." />,
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Use a full address, like alex.com.")).toBeInTheDocument();
  });
});

describe("Accordion", () => {
  it("opens a second panel", async () => {
    render(
      <Accordion
        items={[
          { title: "One", content: "First answer" },
          { title: "Two", content: "Second answer" },
        ]}
      />,
    );
    expect(screen.getByText("First answer")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Two" }));
    expect(screen.getByText("Second answer")).toBeInTheDocument();
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
