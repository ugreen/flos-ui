import React, {Fragment, ReactNode} from 'react';
import styled from 'styled-components';
import { darken, rgba } from 'polished';
import { color, typography } from '../../shared/styles';
import { easing } from '../../shared/animation';
import { useId } from '../../shared/hooks';

const Text = styled.span`
  display: inline-block;
  vertical-align: top;
`;

const Loading = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  opacity: 0;
`;

const APPEARANCES = {
  PRIMARY: 'primary',
  PRIMARY_OUTLINE: 'primaryOutline',
  SECONDARY: 'secondary',
  SECONDARY_OUTLINE: 'secondaryOutline',
  TERTIARY: 'tertiary',
  OUTLINE: 'outline',
} as const;

const SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
} as const;

type ValueOf<T> = T[keyof T];

type SharedProps = {
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: ReactNode;
  isLink?: boolean;
  appearance?: ValueOf<typeof APPEARANCES>;
  isUnclickable?: boolean;
  containsIcon?: boolean;
  size?: ValueOf<typeof SIZES>;
  ButtonWrapper?: ReactNode | string;
  className?: string;
}


type ButtonProps = SharedProps & JSX.IntrinsicElements['button'];

type AnchorProps = SharedProps & JSX.IntrinsicElements['a'];

type LinkProps = Omit<AnchorProps, 'href'> & { to?: string };

type AllProps = ButtonProps & AnchorProps & LinkProps

type Button = {
  // todo: fix typing this: as?: React.FunctionComponent | string;
  as?: any;
  children: ReactNode;
} & AllProps;


const StyledButton = styled.button<Button>`
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: ${props => props.size === SIZES.SMALL ? '8px 16px' : '13px 20px'};
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all 150ms ease-out;
  transform: translate3d(0,0,0);
  vertical-align: top;
  white-space: nowrap;
  user-select: none;
  opacity: 1;
  margin: 0;
  background: transparent;


  font-size: ${(props) =>
    props.size === SIZES.SMALL ? typography.size.s1 : typography.size.s2}px;
  font-weight: ${typography.weight.extrabold};
  line-height: 1;

  ${(props) =>
    !props.isLoading &&
    `
      &:hover {
        transform: translate3d(0, -2px, 0);
        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
      }

      &:active {
        transform: translate3d(0, 0, 0);
      }

      &:focus {
        box-shadow: ${rgba(color.primary, 0.4)} 0 1px 9px 2px;
      }

      &:focus:hover {
        box-shadow: ${rgba(color.primary, 0.2)} 0 8px 18px 0px;
      }
    `}

  ${Text} {
    transform: scale3d(1,1,1) translate3d(0,0,0);
    transition: transform 700ms ${easing.rubber};
    opacity: 1;
  }

  ${Loading} {
    transform: translate3d(0, 100%, 0);
  }

  svg {
    height: ${(props) => (props.size === SIZES.SMALL ? '14' : '16')}px;
    width: ${(props) => (props.size === SIZES.SMALL ? '14' : '16')}px;
    vertical-align: top;
    margin-right: ${(props) => (props.size === SIZES.SMALL ? '4' : '6')}px;
    margin-top: ${(props) => (props.size === SIZES.SMALL ? '-1' : '-2')}px;
    margin-bottom: ${(props) => (props.size === SIZES.SMALL ? '-1' : '-2')}px;

    /* Necessary for js mouse events to not glitch out when hovering on svgs */
    pointer-events: none;
  }

  ${(props) =>
    props.disabled &&
    `
      cursor: not-allowed !important;
      opacity: 0.5;
      &:hover {
        transform: none;
      }
    `}

  ${(props) =>
    props.isUnclickable &&
    `
      cursor: default !important;
      pointer-events: none;
      &:hover {
        transform: none;
      }
    `}

  ${(props) =>
    props.isLoading &&
    `
      cursor: progress !important;
      opacity: 0.7;

      ${Loading} {
        transition: transform 700ms ${easing.rubber};
        transform: translate3d(0, -50%, 0);
        opacity: 1;
      }

      ${Text} {
        transform: scale3d(0, 0, 1) translate3d(0, -100%, 0);
        opacity: 0;
      }

      &:hover {
        transform: none;
      }
    `}

  ${(props) =>
    props.containsIcon &&
    `
      svg {
        display: block;
        margin: 0;
      }
      padding: ${props.size === SIZES.SMALL ? '7' : '12'}px;
    `}

  ${(props) =>
    props.appearance === APPEARANCES.PRIMARY &&
    `
      background: ${color.primary};
      color: ${color.lightest};

      ${
        !props.isLoading &&
        `
          &:hover {
            background: ${darken(0.05, color.primary)};
          }
          &:active {
            box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;
          }
          &:focus {
            box-shadow: ${rgba(color.primary, 0.4)} 0 1px 9px 2px;
          }
          &:focus:hover {
            box-shadow: ${rgba(color.primary, 0.2)} 0 8px 18px 0px;
          }
        `
      }
    `}

  ${(props) =>
    props.appearance === APPEARANCES.SECONDARY &&
    `
      background: ${color.secondary};
      color: ${color.lightest};

      ${
        !props.isLoading &&
        `
          &:hover {
            background: ${darken(0.05, color.secondary)};
          }
          &:active {
            box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;
          }
          &:focus {
            box-shadow: ${rgba(color.secondary, 0.4)} 0 1px 9px 2px;
          }
          &:focus:hover {
            box-shadow: ${rgba(color.secondary, 0.2)} 0 8px 18px 0px;
          }
        `
      }
    `}

  ${(props) =>
    props.appearance === APPEARANCES.TERTIARY &&
    `
      background: ${color.tertiary};
      color: ${color.darkest};

      ${
        !props.isLoading &&
        `
          &:hover {
            background: ${darken(0.05, color.tertiary)};
          }
          &:active {
            box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;
          }
          &:focus {
            box-shadow: ${rgba(color.tertiary, 0.4)} 0 1px 9px 2px;
          }
          &:focus:hover {
            box-shadow: ${rgba(color.tertiary, 0.2)} 0 8px 18px 0px;
          }
        `
      }
    `}

  ${(props) =>
    props.appearance === APPEARANCES.OUTLINE &&
    `
      box-shadow: ${color.medium} 0 0 0 1px inset;
      color: ${color.dark};
      background: transparent;

      ${
        !props.isLoading &&
        `
          &:hover {
            box-shadow: ${color.mediumdark} 0 0 0 1px inset;
          }

          &:active {
            background: ${color.medium};
            box-shadow: ${color.medium} 0 0 0 1px inset;
            color: ${color.darkest};
          }
          &:focus {
            box-shadow: ${color.medium} 0 0 0 1px inset, ${rgba(
          color.secondary,
          0.4
        )} 0 1px 9px 2px;
          }
          &:focus:hover {
            box-shadow: ${color.medium} 0 0 0 1px inset, ${rgba(
          color.secondary,
          0.2
        )} 0 8px 18px 0px;
          }
        `
      };
    `};

    ${(props) =>
      props.appearance === APPEARANCES.PRIMARY_OUTLINE &&
      `
        box-shadow: ${color.primary} 0 0 0 1px inset;
        color: ${color.primary};

        &:hover {
          box-shadow: ${color.primary} 0 0 0 1px inset;
          background: transparent;
        }

        &:active {
          background: ${color.primary};
          box-shadow: ${color.primary} 0 0 0 1px inset;
          color: ${color.lightest};
        }
        &:focus {
          box-shadow: ${color.primary} 0 0 0 1px inset, ${rgba(
        color.primary,
        0.4
      )} 0 1px 9px 2px;
        }
        &:focus:hover {
          box-shadow: ${color.primary} 0 0 0 1px inset, ${rgba(
        color.primary,
        0.2
      )} 0 8px 18px 0px;
        }
      `};

    ${(props) =>
      props.appearance === APPEARANCES.SECONDARY_OUTLINE &&
      `
        box-shadow: ${color.secondary} 0 0 0 1px inset;
        color: ${color.secondary};

        &:hover {
          box-shadow: ${color.secondary} 0 0 0 1px inset;
          background: transparent;
        }

        &:active {
          background: ${color.secondary};
          box-shadow: ${color.secondary} 0 0 0 1px inset;
          color: ${color.lightest};
        }
        &:focus {
          box-shadow: ${color.secondary} 0 0 0 1px inset,
            ${rgba(color.secondary, 0.4)} 0 1px 9px 2px;
        }
        &:focus:hover {
          box-shadow: ${color.secondary} 0 0 0 1px inset,
            ${rgba(color.secondary, 0.2)} 0 8px 18px 0px;
        }
      `};

`;

const BaseButton = (props: Button) => {
  const { children, ...rest } = props;
  let Component = props.as;
  if (!Component) {
    Component = 'button';
  }
  const StyledComponent = StyledButton.withComponent(Component);
  return (
    <StyledComponent {...rest}>
      {children}
    </StyledComponent>
  );
};

export const Button = React.forwardRef(function ButtonComp({
  isDisabled = false,
  isLoading = false,
  loadingText,
  isLink,
  children,
  id,
  type, ...props
}: Button, ref: any) {
  const buttonInner = (
    <Fragment>
      <Text>{children}</Text>
      {isLoading && <Loading>{loadingText || 'Loading...'}</Loading>}
    </Fragment>
  );

  const uniqueId = useId(id);

  let tag = 'button';

  if ('href' in props) {
    tag = 'a';
  }

  return (
    <BaseButton
        isLoading={isLoading}
        disabled={isDisabled}
        ref={ref}
        id={id}
        type={type}
        key={`${uniqueId}--${type}`}
        as={tag}
        {...props}
    >
      {buttonInner}
    </BaseButton>
  );
});
