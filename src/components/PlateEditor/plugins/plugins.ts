import {
  createAlignPlugin,
  createBasicElementsPlugin,
  createBasicMarksPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createExitBreakPlugin,
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createFontSizePlugin,
  createHeadingPlugin,
  createImagePlugin,
  createItalicPlugin,
  createLineHeightPlugin,
  createLinkPlugin,
  createListPlugin,
  createMediaEmbedPlugin,
  createParagraphPlugin,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createUnderlinePlugin,
} from '@udecode/plate';
import { plateUI } from '../common';
import { createMyPlugins } from '../types';
import { alignPlugin } from './alignPlugin';
import { exitBreakPlugin } from './exitBreakPlugin';
import { lineHeightPlugin } from './lineHeightPlugin';
import { linkPlugin } from './linkPlugins';
import { resetBlockTypePlugin } from './resetBlockTypePlugin';
import { selectOnBackspacePlugin } from './selectOnBackspacePlugin';
import { softBreakPlugin } from './softBreakPlugin';

export const plugins = createMyPlugins(
  [
    createBoldPlugin(),
    createCodePlugin(),
    createItalicPlugin(),
    createStrikethroughPlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createUnderlinePlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHeadingPlugin(),
    createParagraphPlugin(),
    createBasicMarksPlugin(),
    createBasicElementsPlugin(),
    createResetNodePlugin(resetBlockTypePlugin),
    createSoftBreakPlugin(softBreakPlugin),
    createExitBreakPlugin(exitBreakPlugin),
    createListPlugin(),
    createTodoListPlugin(),
    createLinkPlugin(linkPlugin),
    createMediaEmbedPlugin(),
    createImagePlugin(),
    createTablePlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createLineHeightPlugin(lineHeightPlugin),
    createSelectOnBackspacePlugin(selectOnBackspacePlugin),
    createAlignPlugin(alignPlugin),
  ],
  {
    components: plateUI,
  },
);
