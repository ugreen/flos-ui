import React from "react";

import { Button } from "./button";
import { Icon } from "../..";

export default {
  title: "Components|Button",
  component: Button,
};

export const allButtons = () => (
  <div>
    <Button appearance="primary">Primary</Button>
    <Button as="a" appearance="secondary">
      Secondary
    </Button>
    <Button appearance="tertiary">Tertiary</Button>
    <Button appearance="outline">Outline</Button>
    <Button appearance="primaryOutline">Outline primary</Button>
    <Button appearance="secondaryOutline">Outline secondary</Button>
    <Button appearance="primary" isDisabled>
      Disabled
    </Button>
    <br />
    <Button appearance="primary" isLoading>
      Primary
    </Button>
    <Button appearance="secondary" isLoading>
      Secondary
    </Button>
    <Button appearance="tertiary" isLoading>
      Tertiary
    </Button>
    <Button appearance="outline" isLoading>
      Outline
    </Button>
    <Button appearance="outline" isLoading loadingText="Custom...">
      Outline
    </Button>
    <br />
    <Button appearance="primary" size="small">
      Primary
    </Button>
    <Button appearance="secondary" size="small">
      Secondary
    </Button>
    <Button appearance="tertiary" size="small">
      Tertiary
    </Button>
    <Button appearance="outline" size="small">
      Outline
    </Button>
    <Button appearance="primary" isDisabled size="small">
      Disabled
    </Button>
    <Button appearance="outline" size="small" containsIcon>
      <Icon icon="link" aria-label="Link" />
    </Button>
    <Button appearance="outline" size="small">
      <Icon icon="link" />
      Link
    </Button>
  </div>
);

allButtons.story = {
  name: "all-buttons",
};

export const anchorWrapper = () => (
  <div>
    <Button appearance="primary" href="http://storybook.js.org">
      Primary
    </Button>
    <Button appearance="secondary" href="http://storybook.js.org">
      Secondary
    </Button>
    <Button appearance="tertiary" href="http://storybook.js.org">
      Tertiary
    </Button>
    <Button appearance="outline" href="http://storybook.js.org">
      Outline
    </Button>
    <Button appearance="primaryOutline" href="http://storybook.js.org">
      Outline primary
    </Button>
    <Button appearance="secondaryOutline" href="http://storybook.js.org">
      Outline secondary
    </Button>
    <Button appearance="primary" isDisabled href="http://storybook.js.org">
      Disabled
    </Button>
    <br />
    <Button appearance="primary" isLoading href="http://storybook.js.org">
      Primary
    </Button>
    <Button appearance="secondary" isLoading href="http://storybook.js.org">
      Secondary
    </Button>
    <Button appearance="tertiary" isLoading href="http://storybook.js.org">
      Tertiary
    </Button>
    <Button appearance="outline" isLoading href="http://storybook.js.org">
      Outline
    </Button>
    <Button
      appearance="outline"
      isLoading
      loadingText="Custom..."
      href="http://storybook.js.org"
    >
      Outline
    </Button>
    <br />
    <Button appearance="primary" size="small" href="http://storybook.js.org">
      Primary
    </Button>
    <Button appearance="secondary" size="small" href="http://storybook.js.org">
      Secondary
    </Button>
    <Button appearance="tertiary" size="small" href="http://storybook.js.org">
      Tertiary
    </Button>
    <Button appearance="outline" size="small" href="http://storybook.js.org">
      Outline
    </Button>
    <Button
      appearance="primary"
      isDisabled
      size="small"
      href="http://storybook.js.org"
    >
      Disabled
    </Button>
    <Button
      appearance="outline"
      size="small"
      containsIcon
      href="http://storybook.js.org"
    >
      <Icon icon="link" aria-label="Link" />
    </Button>
    <Button
      as="a"
      appearance="outline"
      size="small"
      href="http://storybook.js.org"
    >
      <Icon icon="link" />
      Link
    </Button>
  </div>
);

anchorWrapper.story = {
  name: "anchor-wrapper",
};
