import React, { FC, ReactElement } from 'react';

import { RenderElementProps, RenderLeafProps, useSlate } from 'slate-react';

import { BlockButtonProp, CustomElement, CustomText, MarkButtonProp } from './RichTextTypes';
import imagesStore from '../../app/stores/imagesStore';
import ToggleButton from '@mui/material/ToggleButton';
import { isBlockActive, isMarkActive, toggleBlock, toggleMark } from './RichTextHelpers';
import { GetIcon } from './RichTextComponents';

export const Leaf: FC<RenderLeafProps> = props => {
  const { attributes, leaf } = props;
  let { children } = props;
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  if (leaf.strike) children = <s>{children}</s>;

  return <span {...attributes}>{children}</span>;
};

export const Elem: FC<RenderElementProps> = props => {
  const { attributes, children, element } = props;
  const style: React.CSSProperties = { textAlign: element.align };
  const fullPath = 'path' in element ? element.path : undefined;
  switch (props.element.type) {
    case 'block-quote':
      return (
        <blockquote style={{ textAlign: element.align }} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case 'picture':
      return (
        <div style={style} {...attributes}>
          <img src={'https://backschool.sitetopic.ru' + fullPath} alt={element.path} />
          {/* <img src={'https://lk.trizum.ru' + fullPath} alt={element.path} /> */}
          {children}
        </div>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};
