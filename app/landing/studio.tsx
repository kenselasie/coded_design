import * as stylex from "@stylexjs/stylex";
import {
  Body,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Heading,
  Inline,
  LinearProgress,
  Stack,
  Sticker,
  Tag,
} from "codeddesign";
import { colors } from "codeddesign/tokens/colors.stylex";
import { radii } from "codeddesign/tokens/space.stylex";
import { shadows } from "codeddesign/tokens/shadows.stylex";
import { font } from "codeddesign/tokens/typography.stylex";

const styles = stylex.create({
  board: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    minWidth: 0,
    padding: "22px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s3,
  },
  goals: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "12px",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },
  claim: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "12px",
    padding: "16px",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.snow,
  },
  amount: {
    margin: 0,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xxl,
    fontWeight: font.bold,
    letterSpacing: "-0.03em",
  },
  note: {
    margin: 0,
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.45,
    maxWidth: "52ch",
  },
});

const goals = [
  { name: "Retirement", target: "$420,000", value: 65, copy: "$273,000 saved" },
  { name: "Real estate", target: "$85,000", value: 32, copy: "$27,200 saved" },
  { name: "Emergency", target: "$12,000", value: 88, copy: "$10,560 saved" },
];

export function StudioBoard() {
  return (
    <section aria-label="North studio sample dashboard" {...stylex.props(styles.board)}>
      <Stack gap="xs">
        <Inline>
          <Heading size="xl" withoutMargins>
            Savings targets
          </Heading>
          <Sticker tone="pink">Sample</Sticker>
        </Inline>
        <Body>Active milestones for North studio. Figures are demonstration data.</Body>
      </Stack>
      <div {...stylex.props(styles.goals)}>
        {goals.map((goal) => (
          <Card key={goal.name}>
            <CardHeader>
              <CardTitle>{goal.name}</CardTitle>
              <Tag status="active">{goal.target}</Tag>
            </CardHeader>
            <LinearProgress value={goal.value} label={`${goal.name} progress`} />
            <CardContent>
              {goal.value}% · {goal.copy}
            </CardContent>
          </Card>
        ))}
      </div>
      <div {...stylex.props(styles.claim)}>
        <Stack gap="xxs">
          <p {...stylex.props(styles.amount)}>$1,211.29</p>
          <p {...stylex.props(styles.note)}>
            Claimable balance. Once a bank is connected, amounts over $10 go out on the 15th.
          </p>
        </Stack>
        <Inline>
          <Button variant="primary">View report</Button>
          <Button>Hold</Button>
        </Inline>
      </div>
    </section>
  );
}
