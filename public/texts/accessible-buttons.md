# Creating accessible buttons

Even when it comes to something as creating a button, you can still do many things wrong. But no worries! If you stick to some basic rules, you can be sure to have a button that is accessible to all people.

## Use the default HTML button element

You can use all sorts of HTML elements as buttons. Some additional styling and they will look exactly like an actual button element. The problem with these kinds of “buttons” is their lacking accessibility. In contrast to native button elements, they are by default neither focusable, nor can they be trigged using the `Space` or `Enter` key, nor would they be identified by screen readers as buttons. You would need to add substitute attributes manually to the element to achieve that. And even then it is not guaranteed that you will have cross-browser compatibility. So just use native HTML button elements.

## Make your button self-explaining

The purpose of your button should be easy to grasp. You can achieve this in several ways: It should have a meaningful label. As a result, don’t use terms such as ‘yes’, ‘no’, or ‘ok’ as they tell very little about what the button does. You can also give your button a color that is usually associated with its purpose. For example, if you create a delete button, you should probably use a reddish hue as people mostly relate this color to this form of operation.

## Size does matter

Almost 70% of people use mobile devices to browse through the web. Yet way too many websites still have buttons that are too small to be properly used on mobile devices. In order to make your buttons fully accessible, it is therefore recommended to give each of them a minimum size of at least 38x38px. That way you can be sure that all of your users won’t have difficulties pressing them, even those who use their fingers.

## Have clear button states

Button as dynamic elements have different states such as “focus” or “disabled”. In order for your users to be able to distinguish between these states, you should give your button a distinct appearance for its states. From an accessibility point of view, it is especially important to make sure that it is clear if a button is currently on focus. People who, for example, exclusively use keyboards need this information in order to be able to navigate through an application.
