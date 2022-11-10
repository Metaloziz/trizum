import React, { ReactElement } from 'react';
import { FontDownload } from '@styled-icons/material/FontDownload';
import { FormatColorText } from '@styled-icons/material/FormatColorText';
import { Image } from '@styled-icons/material/Image';
import { LineWeight } from '@styled-icons/material/LineWeight';
import { Link as LinkIcon } from '@styled-icons/material/Link';
import { OndemandVideo } from '@styled-icons/material/OndemandVideo';
import { Check } from 'styled-icons/material';
import {
  ColorPickerToolbarDropdown,
  HeadingToolbar,
  ImageToolbarButton,
  LineHeightToolbarDropdown,
  LinkToolbarButton,
  MARK_BG_COLOR,
  MARK_COLOR,
  MediaEmbedToolbarButton,
  ToolbarProps,
} from '@udecode/plate';
import { AlignToolbarButtons } from './AlignToolbarButtons';
import { BasicElementToolbarButtons } from './BasicElementToolbarButtons';
import { BasicMarkToolbarButtons } from './BasicMarkToolbarButtons';
import { ListToolbarButtons } from './ListToolbarButtons';
import { TableToolbarButtons } from './TableToolbarButtons';

const tooltips = {
  color: { content: 'Text color' },
  bg: { content: 'Highlight color' },
};

export const Toolbar = (props: ToolbarProps) => <HeadingToolbar {...props} />;

export const ToolbarButtons = (): ReactElement => (
  <Toolbar>
    <LineHeightToolbarDropdown icon={<LineWeight />} />
    <AlignToolbarButtons />
    <BasicMarkToolbarButtons />
    <BasicElementToolbarButtons />
    <ListToolbarButtons />
    <LinkToolbarButton icon={<LinkIcon />} />
    <ColorPickerToolbarDropdown
      pluginKey={MARK_COLOR}
      icon={<FormatColorText />}
      selectedIcon={<Check />}
      tooltip={tooltips.color}
    />
    <ColorPickerToolbarDropdown
      pluginKey={MARK_BG_COLOR}
      icon={<FontDownload />}
      selectedIcon={<Check />}
      tooltip={tooltips.bg}
    />
    <ImageToolbarButton icon={<Image />} />
    <MediaEmbedToolbarButton icon={<OndemandVideo />} />
    <TableToolbarButtons />
  </Toolbar>
);
