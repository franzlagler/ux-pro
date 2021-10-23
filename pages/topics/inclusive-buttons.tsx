import parse from 'html-react-parser';
import Image from 'next/image';
import styled from 'styled-components';
import { LinkButton } from '../../components/Buttons';
import { CodeBlock, NarrowContainer } from '../../components/ContainerElements';
import {
  ParaText,
  PrimHeading,
  SecHeading,
} from '../../components/TextElements';

export default function topic() {
  return (
    <NarrowContainer>
      <LinkButton href="/topics" purple>
        <Image src="/images/arrow.svg" width="20px" height="20px" /> &nbsp;Back
      </LinkButton>
      <PrimHeading>Creating inclusive buttons</PrimHeading>
      <ParaText>
        Even when it comes to something as creating a button, you can still do
        many things wrong. But no worries! If you stick to some basic rules, you
        can be sure to have a button that is accessible to all people.
      </ParaText>
      <SecHeading>Use a native button element</SecHeading>
      <ParaText>
        You can use all sorts of HTML elements as buttons. Some additional
        styling and they will look exactly like an actual
        <CodeBlock>&lt;button&gt;</CodeBlock>element. The problem with these
        kinds of “buttons” is their lacking accessibility. In contrast to native
        button elements, they are by default neither focusable, nor can they be
        trigged using the <CodeBlock>Space</CodeBlock> or
        <CodeBlock>Enter</CodeBlock>key, nor would they be identified by screen
        readers as buttons. You would need to add substitute attributes manually
        to the element to achieve that. And even then it is not guaranteed that
        you will have cross-browser compatibility. So just use native HTML
        button elements.
      </ParaText>
      <SecHeading>Make your button self-explaining</SecHeading>
      <ParaText>
        The purpose of your button should be easy to grasp. You can achieve this
        in several ways: It should have a meaningful label. As a result, don’t
        use terms such as ‘yes’, ‘no’, or ‘ok’ as they tell very little about
        what the button does. You can also give your button a color that is
        usually associated with its purpose. For example, if you create a delete
        button, you should probably use a reddish hue as people mostly relate
        this color to this form of operation.
      </ParaText>
      <SecHeading>Size does matter</SecHeading>
      <ParaText>
        Yes, you were taught in school that it’s not about size but inner
        values. But when it comes to buttons, this is simply not true. The size
        of a button does matter. That much indeed that too small buttons will
        dramatically reduce the accessibility of your application. As a rule of
        thumb, you should make all of your buttons are at least 38x38px large.
        That way you can be sure that all of your buttons are accessible, also
        on touchscreens.
      </ParaText>
      <SecHeading>Clear Button States</SecHeading>
      <ParaText>
        Buttons are dynamic elements. That means that they can change their
        current state depending on their purpose and how you interact with them.
        In order to ensure that all people know in which state your button
        currently is, give every state a distinct appearance. For example, if a
        button should be disabled by default, give it some greyish hue and
        reduce its opacity to stand out from all the other activated ones.
      </ParaText>

      <LinkButton href="/quizzes/1">Start Quiz</LinkButton>
    </NarrowContainer>
  );
}
