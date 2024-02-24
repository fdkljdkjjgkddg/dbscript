
// ==UserScript==
// @name			Infinite Craft Helper
// @namespace		mikarific.com
// @match			https://neal.fun/infinite-craft/*
// @version			2.0.4
// @author			Mikarim6xw
// @description		A script that adds various useful features to Infinite Craft.
// @icon			https://i.imgur.com/WlkWOkU.png
// @grant			GM.getValue
// @grant			GM.setValue
// @grant			GM.xmlHttpRequest
// @grant			unsafeWindow
// @license			MIT
// @downloadURL  https://github.com/fdkljdkjjgkddg/dbscript/raw/main/script.user.js
// @updateURL    https://github.com/fdkljdkjjgkddg/dbscript/raw/main/script.user.js
//
// Created with love using Gorilla
// ==/UserScript==

(function () {
    'use strict';

    const css = `
    :root {
        --base: #fff;
        --border: #c8c8c8;
        --border-hover: #91a8c1;
        --text: #000;
        --selected-gradient: linear-gradient(0deg,#d6fcff,#fff 90%);
    }

    .item {
        margin: 4px;
        cursor: pointer;
        padding: 8px 8px 7px;
        border-radius: 5px;
        display: inline-block;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        border: 1px solid var(--border);
        transition: background .15s linear;
        background: var(--base);
        line-height: 1em;
    }

    .item:hover {
        background: var(--selected-gradient);
        border: 1px solid var(--border-hover);
    }

    .pinned {
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
        padding: 9px;
        border: 0px;
        border-bottom: 1px;
        border-style: solid;
        border-color: var(--border);
    }

    .pinned-title {
        margin: 4px;
        font-size: 15px;
        font-family: Roboto, sans-serif;
        color: var(--text);
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        pointer-events: none;
    }

    .sidebar-header {
        display: flex;
        position: sticky;
        height: auto !important;
        top: 0px;
        background-color: var(--base) !important;
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
        padding: 9px;
        border: 0px;
        border-bottom: 1px;
        border-style: solid;
        border-color: var(--border);
    }

    .sidebar-input {
        height: 40px !important;
        margin: 4px;
        border-radius: 5px;
        border: 1px solid var(--border) !important;
        font-family: Roboto, sans-serif;
        background-size: 21px 21px !important;
        background-position: 10px 10px !important;
        background-color: var(--base) !important;
        color: var(--text);
    }

    .settings-details {
        margin: 4px;
        height: 40px;
    }

    .settings-summary {
        list-style: none;
    }

    .settings-button {
        height: 40px;
        padding: 8px 8px 7px;
        border: 1px solid var(--border);
        border-radius: 5px;
        cursor: pointer;
        opacity: .8;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }
    .settings-button:hover {
        transform: scale(1.05)
    }

    .settings-content {
        display: flex;
        flex-direction: column;
        gap: 5px;
        position: absolute;
        right: 13px;
        padding: 8px 8px 7px;
        border: 1px solid var(--border);
        border-radius: 5px;
        background-color: var(--base);
    }

    .setting {
        display: flex;
        gap: 5px;
        justify-content: flex-end;
        cursor: pointer;
        padding: 8px 8px 7px;
        border: 1px solid var(--border);
        border-radius: 5px;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        line-height: 1em;
        font-family: Roboto, sans-serif;
        font-size: 15.4px;
        color: var(--text);
    }
    .setting:hover {
        background: var(--selected-gradient);
        border: 1px solid var(--border-hover);
    }

    .setting > img {
        height: 1em;
        opacity: .8;
        aspect-ratio: 1 / 1;
    }

    #import-save {
        display: none;
    }

    .search-hidden {
        height: 0px !important;
        border: 0px !important;
        font-size: 0px !important;
        margin: 0px !important;
        visibility: hidden;
    }

    .search-hidden .item-emoji {
        font-size: 0px;
    }

    .site-title {
        z-index: 1;
    }

    .version {
        position: fixed;
        top: 80px;
        right: 320px;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        pointer-events: none;
        color: var(--text);
        font-family: Roboto, sans-serif;
        font-size: 11px;
    }

    @media screen and (min-width: 1150px) {
        .version {
            top: 85px;
            right: 362px;
        }
    }

    .side-controls {
        z-index: 1;
    }

    .random, .discoveries-icon {
        width: 21px;
        cursor: pointer;
        opacity: .8;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }

    .random:hover, .discoveries-icon:hover {
        transform: scale(1.05);
    }

    .modal {
        max-width: 75%;
        max-height: 75%;
        margin: auto;
        padding-top: 0px;
        border: 1px solid var(--border);
        border-radius: 5px;
        background-color: var(--base);
    }

    .modal::backdrop {
        background-color: rgb(0 0 0 / .5);
    }

    .modal-header {
        position: sticky;
        top: 0;
        display: flex;
        padding-top: 16px;
        padding-bottom: 16px;
        justify-content: space-between;
        background-color: var(--base);
    }

    .modal-title {
        font-size: 20px;
        font-family: Roboto, sans-serif;
        line-height: 35px;
        color: var(--text);
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }

    .modal-empty {
        font-size: 15px;
        font-family: Roboto, sans-serif;
        color: var(--text);
        text-align: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        pointer-events: none;
    }

    .display-item {
        margin: 4px;
        padding: 8px 8px 7px;
        border-radius: 5px;
        display: inline-block;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        border: 1px solid var(--border);
        background: var(--base);
        line-height: 1em;
        white-space: nowrap;
        color: var(--text);
    }

    .recipe {
        display: flex;
        align-items: center;
        color: var(--text);
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }

    .close-button {
        height: 35px;
        padding: 8px 8px 7px;
        border: 1px solid var(--border);
        border-radius: 5px;
        cursor: pointer;
        opacity: .8;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }
    .close-button:hover {
        transform: scale(1.05)
    }

    .instance-emoji {
        pointer-events: none;
    }
`;
    function init$a(elements) {
        elements.styles.appendChild(document.createTextNode(css.trim()));
        document.getElementsByTagName('head')[0].appendChild(elements.styles);
    }

    function setMiddleClickOnMutations(mutations, elements) {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                for (const node of mutation.addedNodes) {
                    node.addEventListener('mousedown', (e) => {
                        e.preventDefault();
                        if (e instanceof MouseEvent &&
                            e.button === 1 &&
                            e.target instanceof HTMLElement &&
                            (e.target.classList.contains('instance') ||
                                e.target.classList.contains('instance-discovered-text') ||
                                e.target.classList.contains('instance-discovered-emoji'))) {
                            unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].playInstanceSound();
                            const targetElement = e.target.classList.contains('instance-discovered-emoji')
                                ? e.target.parentElement?.parentElement
                                : e.target.classList.contains('instance-discovered-text')
                                    ? e.target.parentElement
                                    : e.target;
                            const { x, y, width, height } = targetElement.getBoundingClientRect();
                            const data = {
                                id: unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.instanceId++,
                                text: targetElement.childNodes[1].textContent?.trim(),
                                emoji: targetElement.childNodes[0].textContent?.trim(),
                                discovered: targetElement.classList.contains('instance-discovered'),
                                disabled: false,
                                left: x,
                                top: y,
                                offsetX: 0.5,
                                offsetY: 0.5,
                            };
                            unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.selectedInstance = cloneInto(data, unsafeWindow);
                            unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.instances.push(unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.selectedInstance);
                            unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].$nextTick(exportFunction(() => {
                                unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].setInstancePosition(unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.selectedInstance, e.clientX - width / 2, e.clientY - height / 2);
                                unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].setInstanceZIndex(unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.selectedInstance, data.id);
                            }, unsafeWindow));
                        }
                    });
                }
            }
        }
    }

    const closeIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNjAwIj48cGF0aCBkPSJNMzAwLjAwMDAyLDM0OS44MzIzM0w2MC4xMDc4Miw1ODkuNzIzMzJjLTYuNTQ2ODksNi41NDc2OS0xNC43NzY0Myw5Ljg5NzE4LTI0LjY4ODYsMTAuMDQ4NTEtOS45MTEzOCwuMTUyMS0xOC4yOTIyNC0zLjE5NzQtMjUuMTQyNTYtMTAuMDQ4NTFDMy40MjU1Nyw1ODIuODcyOTgsLjAwMDAyLDU3NC41Njc4LDAsNTY0LjgwNzc0Yy4wMDAwMi05Ljc2MDA3LDMuNDI1NTctMTguMDY1MjYsMTAuMjc2NjYtMjQuOTE1NTZsMjM5Ljg5MTAxLTIzOS44OTIyTDEwLjI3NjY4LDYwLjEwNzc4QzMuNzI4OTksNTMuNTYwOTIsLjM3OTUsNDUuMzMxMzYsLjIyODE3LDM1LjQxOTIyLC4wNzYwNywyNS41MDc4OCwzLjQyNTU3LDE3LjEyNywxMC4yNzY2OCwxMC4yNzY2NiwxNy4xMjcwMiwzLjQyNTUzLDI1LjQzMjIsMCwzNS4xOTIyNiwwczE4LjA2NTI2LDMuNDI1NTMsMjQuOTE1NTYsMTAuMjc2NjZsMjM5Ljg5MjIsMjM5Ljg5MDk3TDUzOS44OTIyMiwxMC4yNzY1OWM2LjU0Njg2LTYuNTQ3NzIsMTQuNzc2NDMtOS44OTcyLDI0LjY4ODU2LTEwLjA0ODUxLDkuOTExMzQtLjE1MjE3LDE4LjI5MjIyLDMuMTk3MzgsMjUuMTQyNTYsMTAuMDQ4NTEsNi44NTExMyw2Ljg1MDI3LDEwLjI3NjY2LDE1LjE1NTUyLDEwLjI3NjY2LDI0LjkxNTU2cy0zLjQyNTUzLDE4LjA2NTIyLTEwLjI3NjY2LDI0LjkxNTU2bC0yMzkuODkwOTcsMjM5Ljg5MjI3LDIzOS44OTEwNSwyMzkuODkyMmM2LjU0NzcyLDYuNTQ2ODksOS44OTcyLDE0Ljc3NjQzLDEwLjA0ODUxLDI0LjY4ODYsLjE1MjE3LDkuOTExMzgtMy4xOTczOCwxOC4yOTIyNC0xMC4wNDg1MSwyNS4xNDI1Ni02Ljg1MDI3LDYuODUxMS0xNS4xNTU1MiwxMC4yNzY2NC0yNC45MTU1NiwxMC4yNzY2Ni05Ljc2MDA0LS4wMDAwMi0xOC4wNjUyMi0zLjQyNTU3LTI0LjkxNTU2LTEwLjI3NjY2bC0yMzkuODkyMjctMjM5Ljg5MTAxWiIvPjwvc3ZnPg==';
    const discoveriesIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNTgzLjM3ODA1Ij48cGF0aCBkPSJNMzUyLjY3NTUxLDU2Ni43NTU2NGMtMTQuOTYwMjYsMC0yOC4zODM0Ny0xMC4wMTE1My0zMi42NDQxNy0yNC4zNDUzOGwtNTIuNzc4OTktMTc4LjIwMTM1LTEzOS42NzIwNS01MS43MDY5MWMtMTMuMjg4OTItNC45MDI3NC0yMi4yMjk3NS0xNy43MzgxOC0yMi4yMjk3NS0zMS45MzM1OSwwLTE0LjE2LDguOTI1NjYtMjYuOTkwMzgsMjIuMjEwODktMzEuOTI1NzhsMTM5Ljg1NjkzLTUxLjc2MzAyTDMyMC4xMTY4OCwyNC4xMDk0NGM0LjM5NDk5LTE0LjQxODk0LDE3LjQ3ODc4LTI0LjEwOTQ0LDMyLjU1ODYyLTI0LjEwOTQ0LDE1LjA3ODkyLDAsMjguMTYyNzEsOS42OTA1LDMyLjU1ODYyLDI0LjExMzU4bDUyLjcxNDE0LDE3Mi43NjYwMiwxMzkuODU1MDksNTEuNzY4MDhjMTMuMjc2MDQsNC45NDU5NywyMi4xOTY2NCwxNy43NzM1OSwyMi4xOTY2NCwzMS45MjA3MiwwLDE0LjE5NzI2LTguOTM4MDgsMjcuMDI3MTctMjIuMjQwNzksMzEuOTI3MTVsLTEzOS42NjEwMSw1MS42OTY4LTUyLjc3NDg1LDE3OC4xODQ3OWMtNC4yNTYxLDE0LjM1NTkzLTE3LjY4MTE1LDI0LjM3ODUtMzIuNjQ3ODUsMjQuMzc4NVpNMTQxLjcwNTgxLDI4MC41Njg4NmwxNTQuMDA4Miw1Ny4wMTQzOSw1Ni45NTg3NCwxOTIuMzEzNTIsNTYuOTYzOC0xOTIuMzMwOTksMTUzLjk5Mzk0LTU3LjAwMjQzLTE1My45NzY0Ni01Ni45OTQ2MS01Ni45Nzg1MS0xODYuNzQ1NzMtNTYuOTYxOTYsMTg2Ljc0NTczLTE1NC4wMDc3NCw1Ny4wMDAxM1oiLz48cGF0aCBkPSJNMTY5LjgzMjY1LDU4My4zNzgwNWMtMTUuNjIwMjUsMC0yOS4xOTc5OS0xMC41ODA5MS0zMy4wMTk0Ni0yNS43MzA2NmwtMTIuODUxOTktNTEuMzIwNTgtMjkuNjMyMTYtMTAuOTg1NjRjLTEzLjI4MTU2LTQuODk5OTgtMjIuMjIyODUtMTcuNzM1NDItMjIuMjIyODUtMzEuOTMwMzdzOC45NDEzLTI3LjAzMDM5LDIyLjI0OTA3LTMxLjkzOTU3bDMwLjAyNDAxLTExLjExMjU4LDEyLjYwMTgtNDYuMjA1MzZjNC4wNDMxNS0xNC43NzgxMywxNy41NTA1My0yNS4wOTA0NSwzMi44NTE1OS0yNS4wOTA0NSwxNS4zMzI4LDAsMjguODM4OCwxMC4zMzgwNywzMi44NDQyMywyNS4xNDEwNGwxMi41OTIxNCw0Ni4xNzEzMiwzMC4wMTE1OSwxMS4xMDE1NGMxMy4zMjUyNSw0Ljg4NTI3LDIyLjI3ODUsMTcuNzE3OTQsMjIuMjc4NSwzMS45MzQwNSwwLDE0LjIxODg3LTguOTU1NTUsMjcuMDUzMzktMjIuMjg0OTQsMzEuOTM2ODFsLTI5LjU3MDA3LDEwLjk2MjY0LTEyLjg0NDYzLDUxLjI5MjA3Yy0zLjgyMDU1LDE1LjE4Mzc4LTE3LjM5OTY4LDI1Ljc3NTczLTMzLjAyNjgyLDI1Ljc3NTczWm0tNjEuMzcxMi0xMTkuOTY2MzNsNDQuODQzNTQsMTYuNjI0MjUsMTYuNTI1ODMsNjUuOTkzODYsMTYuNTI5NTEtNjYuMDEwNDEsNDQuNzk4OTItMTYuNjA3NjktNDQuNzk1MjQtMTYuNTcwOS0xNi41NDE5My02MC42NTA1MS0xNi41MzU5NSw2MC42MzIxMS00NC44MjQ2OCwxNi41ODkzWm0tMTAuNzM0OTgtMjYyLjM0MDg3Yy0xNC4xNjA0NiwwLTI2Ljk5MDg0LTguOTI2MTItMzEuOTI2MjQtMjIuMjEwODlsLTExLjc3MTY0LTMxLjgxNzY5LTMxLjc5NTYyLTExLjc2MzM2QzguOTQwMzgsMTMwLjM3Mzg1LDAsMTE3LjUzODQyLDAsMTAzLjM0NDM4YzAtMTQuMTYwOTIsOC45MjYxMi0yNi45OTA4NCwyMi4yMTEzNS0zMS45MjYyNGwzMS44MTcyMy0xMS43NzE2NCwxMS43NjMzNi0zMS43OTU2MmM0Ljk0NDE0LTEzLjMwNzMxLDE3Ljc3NDUxLTIyLjIzMjk3LDMxLjkzNDUxLTIyLjIzMjk3LDE0LjE5NDUsMCwyNy4wMjk5Myw4Ljk0MDg0LDMxLjkzOTU3LDIyLjI0ODE1bDExLjc3MTY0LDMxLjc4MDQ0LDMxLjgwMzQ0LDExLjc3MTY0YzEzLjI4NTcsNC45MzU0LDIyLjIxMTgxLDE3Ljc2NTMxLDIyLjIxMTgxLDMxLjkyNjI0LDAsMTQuMTYtOC45MjU2NiwyNi45OTAzOC0yMi4yMTA4OSwzMS45MjYyNGwtMzEuODE3NjksMTEuNzcxNjQtMTEuNzYzODIsMzEuNzk1NjJjLTQuOTQyNzYsMTMuMzA2MzktMTcuNzcyNjcsMjIuMjMyOTctMzEuOTM0MDUsMjIuMjMyOTdaTTM2LjM1NjY0LDEwMy4zNDQzOGw0NC43OTYxNiwxNi41NzM2NiwxNi41NzM2Niw0NC43OTYxNiwxNi41NzM2Ni00NC43OTYxNiw0NC43OTY2Mi0xNi41NzM2Ni00NC43NzY4NS0xNi41NzM2Ni0xNi41OTM0NC00NC43OTc1NC0xNi41NzM2Niw0NC43OTc1NC00NC43OTYxNiwxNi41NzM2NloiLz48L3N2Zz4=';
    const randomIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNjAwIj48cGF0aCBkPSJNNjAuNTc2NTcsNjAwYy0xNy4yNTkzOCwwLTMxLjY3MDMyLTUuNzgxMjUtNDMuMjMyODItMTcuMzQzNzVTMCw1NTYuNjgyODEsMCw1MzkuNDIzNDN2LTEwOC4xNzM0M2MwLTUuMzM2MjQsMS43OTA5NC05Ljc5NTMxLDUuMzcyODItMTMuMzc3MiwzLjU4MTI2LTMuNTgxODksOC4wNDAzLTUuMzcyOCwxMy4zNzcxOC01LjM3MjgsNS4zMzYyNSwwLDkuNzk1MywxLjc5MDkxLDEzLjM3NzE4LDUuMzcyOCwzLjU4MTg3LDMuNTgxODYsNS4zNzI4Miw4LjA0MDkzLDUuMzcyODIsMTMuMzc3MnYxMDguMTczNDVjMCw1Ljc2ODc0LDIuNDAzNzYsMTEuMDU3MTgsNy4yMTEyNSwxNS44NjUzMiw0LjgwODEyLDQuODA3NDgsMTAuMDk2NTYsNy4yMTEyNCwxNS44NjUzMiw3LjIxMTI0aDEwOC4xNzM0M2M1LjMzNjI0LDAsOS43OTUzMSwxLjc5MDk0LDEzLjM3NzIsNS4zNzI4MiwzLjU4MTg5LDMuNTgxODksNS4zNzI4LDguMDQwOTMsNS4zNzI4LDEzLjM3NzE4LDAsNS4zMzY4OC0xLjc5MDkxLDkuNzk1OTMtNS4zNzI4LDEzLjM3NzE4LTMuNTgxODksMy41ODE4Ny04LjA0MDk2LDUuMzcyODItMTMuMzc3Miw1LjM3MjgySDYwLjU3NjU3Wm00NzguODQ2ODgsMGgtMTA4LjE3MzQ1Yy01LjMzNjI3LDAtOS43OTUyOC0xLjc5MDk0LTEzLjM3NzE3LTUuMzcyODItMy41ODE4OS0zLjU4MTI2LTUuMzcyODMtOC4wNDAzLTUuMzcyODMtMTMuMzc3MTgsMC01LjMzNjI1LDEuNzkwOTQtOS43OTUzLDUuMzcyODMtMTMuMzc3MTgsMy41ODE4OS0zLjU4MTg3LDguMDQwOTYtNS4zNzI4MiwxMy4zNzcxNy01LjM3MjgyaDEwOC4xNzM0NWM1Ljc2ODc0LDAsMTEuMDU3MjItMi40MDM3NiwxNS44NjUyOS03LjIxMTI1LDQuODA3NTUtNC44MDgxMiw3LjIxMTI3LTEwLjA5NjU2LDcuMjExMjctMTUuODY1MzJ2LTEwOC4xNzM0M2MwLTUuMzM2MjQsMS43OTA5NC05Ljc5NTMxLDUuMzcyODMtMTMuMzc3MiwzLjU4MTg5LTMuNTgxODksOC4wNDA5Ni01LjM3MjgsMTMuMzc3MTctNS4zNzI4LDUuMzM2ODksMCw5Ljc5NTkxLDEuNzkwOTEsMTMuMzc3MTcsNS4zNzI4LDMuNTgxODksMy41ODE4OSw1LjM3MjgzLDguMDQwOTYsNS4zNzI4MywxMy4zNzcydjEwOC4xNzM0NWMwLDE3LjI1OTM2LTUuNzgxMjcsMzEuNjcwMzEtMTcuMzQzNzUsNDMuMjMyOC0xMS41NjI0OCwxMS41NjI1LTI1Ljk3MzQ1LDE3LjM0Mzc1LTQzLjIzMjgsMTcuMzQzNzVaTTAsNjAuNTc2NTVDMCw0My4zMTcyLDUuNzgxMjUsMjguOTA2MjMsMTcuMzQzNzUsMTcuMzQzNzUsMjguOTA2MjUsNS43ODEyNyw0My4zMTcxOSwwLDYwLjU3NjU3LDBoMTA4LjE3MzQzYzUuMzM2MjQsMCw5Ljc5NTMxLDEuNzkwOTQsMTMuMzc3Miw1LjM3MjgzLDMuNTgxODksMy41ODEyNiw1LjM3MjgsOC4wNDAyOCw1LjM3MjgsMTMuMzc3MTcsMCw1LjMzNjMyLTEuNzkwOTEsOS43OTUyOC01LjM3MjgsMTMuMzc3MTctMy41ODE4NiwzLjU4MTgzLTguMDQwOTMsNS4zNzI4My0xMy4zNzcyLDUuMzcyODNINjAuNTc2NTdjLTUuNzY4NzUsMC0xMS4wNTcxOCwyLjQwMzcyLTE1Ljg2NTMyLDcuMjExMjctNC44MDc0OSw0LjgwODA2LTcuMjExMjUsMTAuMDk2NTUtNy4yMTEyNSwxNS44NjUyOXYxMDguMTczNDVjMCw1LjMzNjI3LTEuNzkwOTQsOS43OTUyOC01LjM3MjgyLDEzLjM3NzE3LTMuNTgxODksMy41ODE4My04LjA0MDkzLDUuMzcyNzctMTMuMzc3MTgsNS4zNzI4My01LjMzNjg4LDAtOS43OTU5My0xLjc5MDk0LTEzLjM3NzE4LTUuMzcyODMtMy41ODE4Ny0zLjU4MTg5LTUuMzcyODItOC4wNDA5LTUuMzcyODItMTMuMzc3MTdWNjAuNTc2NTVabTYwMCwwdjEwOC4xNzM0NWMwLDUuMzM2MjctMS43OTA5NCw5Ljc5NTI4LTUuMzcyODMsMTMuMzc3MTctMy41ODEyNiwzLjU4MTg5LTguMDQwMjgsNS4zNzI4My0xMy4zNzcxNyw1LjM3MjgzLTUuMzM2MzIsMC05Ljc5NTI4LTEuNzkwOTQtMTMuMzc3MTctNS4zNzI4My0zLjU4MTgzLTMuNTgxODktNS4zNzI4My04LjA0MDk2LTUuMzcyODMtMTMuMzc3MTdWNjAuNTc2NTVjMC01Ljc2ODc0LTIuNDAzNzItMTEuMDU3MjItNy4yMTEyNy0xNS44NjUyOS00LjgwODA2LTQuODA3NTUtMTAuMDk2NTUtNy4yMTEyNy0xNS44NjUyOS03LjIxMTI3aC0xMDguMTczNDVjLTUuMzM2MjcsMC05Ljc5NTI4LTEuNzkwOTQtMTMuMzc3MTctNS4zNzI4My0zLjU4MTgzLTMuNTgxODktNS4zNzI3Ny04LjA0MDk2LTUuMzcyODMtMTMuMzc3MTcsMC01LjMzNjg5LDEuNzkwOTQtOS43OTU5MSw1LjM3MjgzLTEzLjM3NzE3LDMuNTgxODktMy41ODE4OSw4LjA0MDktNS4zNzI4MywxMy4zNzcxNy01LjM3MjgzaDEwOC4xNzM0NWMxNy4yNTkzNSwwLDMxLjY3MDMyLDUuNzgxMjcsNDMuMjMyOCwxNy4zNDM3NXMxNy4zNDM3NSwyNS45NzM0NSwxNy4zNDM3NSw0My4yMzI4Wk0zMDEuNDQxODcsNDk1LjQzMzEzYzguMzE3NTEsMCwxNS4zMjUwMS0yLjg0ODc1LDIxLjAyMjUxLTguNTQ2MjUsNS42OTY5LTUuNjk2ODcsOC41NDUzMy0xMi43MDQwNiw4LjU0NTMzLTIxLjAyMTU3cy0yLjg0ODQzLTE1LjMyNDctOC41NDUzLTIxLjAyMTU3Yy01LjY5NzUzLTUuNjk2ODctMTIuNzA1LTguNTQ1My0yMS4wMjI1MS04LjU0NTMtOC4zMTY5MSwwLTE1LjMyNDA3LDIuODQ4NDMtMjEuMDIxNTcsOC41NDUzLTUuNjk2OSw1LjY5Njg3LTguNTQ1MzMsMTIuNzA0MDYtOC41NDUzMywyMS4wMjE1N3MyLjg0ODQzLDE1LjMyNDcsOC41NDUzLDIxLjAyMTU3YzUuNjk3NDcsNS42OTc1LDEyLjcwNDY5LDguNTQ2MjUsMjEuMDIxNTcsOC41NDYyNVptMC0zNTUuOTYyMTVjMTkuMTM0OTgsMCwzNS42Mzc1LDYuMDgxODUsNDkuNTA3NTEsMTguMjQ1NiwxMy44NzAwMSwxMi4xNjMxMiwyMC44MDUwMiwyNy40OTk2OSwyMC44MDUwMiw0Ni4wMDk3MSwwLDEzLjQxMzE2LTMuOTMwMywyNS42MjQ2OS0xMS43OTA5NiwzNi42MzQ3MS03Ljg2MDAzLDExLjAwOTM5LTE2Ljg2MjE4LDIwLjk2MTIzLTI3LjAwNjU3LDI5Ljg1NTYzLTE2LjI1MDAxLDE0Ljg1NTYtMjguMzUzNDUsMjguNjg5NjgtMzYuMzEwMyw0MS41MDIyLTcuOTU2ODgsMTIuODEyNDktMTIuNTYwMjksMjYuODM5MDYtMTMuODEwMyw0Mi4wNzk3LS42MjQ5OSw0LjkwMzc0LC44MTc0OCw5LjA3NDM5LDQuMzI3NSwxMi41MTE4OCwzLjUwOTM5LDMuNDM3NTIsNy43ODgxMSw1LjE1NjI1LDEyLjgzNjI0LDUuMTU2MjUsNC45MDM3NiwwLDkuMTQ2NTgtMS42ODI4LDEyLjcyODQzLTUuMDQ4NDUsMy41ODE4OS0zLjM2NTAyLDUuNzU3NTItNy41NzE1NSw2LjUyNjg4LTEyLjYxOTY5LDEuNzMwNjMtMTAuNjI1MDEsNS40ODA2My0yMC4xMjAzMiwxMS4yNS0yOC40ODU5NSw1Ljc2ODc0LTguMzY1NjMsMTQuODMxMi0xOC43MjYyNSwyNy4xODc1LTMxLjA4MTg3LDE4Ljk4OTk4LTE4Ljk5MDYxLDMyLjA3ODctMzQuOTY0MDgsMzkuMjY2MjItNDcuOTIwMzMsNy4xODc1Mi0xMi45NTY4OSwxMC43ODEyNS0yNy4zNjgxNCwxMC43ODEyNS00My4yMzM3OCwwLTI4Ljk0MTg4LTkuNzgzNzMtNTIuNTk1NjctMjkuMzUxMjMtNzAuOTYxMjctMTkuNTY2ODgtMTguMzY1NjUtNDQuNzM1MDEtMjcuNTQ4NDUtNzUuNTA0MzctMjcuNTQ4NDUtMjEuMjk4MTEsMC00MC43ODEyNSw0LjgxOTY4LTU4LjQ0OTM4LDE0LjQ1OTA0LTE3LjY2ODc2LDkuNjM5MzYtMzEuODE1NjEsMjMuNjQxODMtNDIuNDQwNjEsNDIuMDA3NDgtMi4zMDc1LDQuMTM1MDQtMi41ODM3Niw4LjU0NjI4LS44Mjg3NSwxMy4yMzM3OHM1LjAxMjIsNy44NzI1MSw5Ljc3MTU3LDkuNTU1MDJjNC4yNzg3NSwxLjY4MjUxLDguODM0MDcsMS44MDI4NSwxMy42NjU5MywuMzYwOTUsNC44MzE4Ny0xLjQ0MjQ3LDguNzg2MjMtNC4xNTkwNywxMS44NjMxMi04LjE0OTY4LDguMzE3NTEtMTAuNjczMTYsMTcuODQ4NzUtMTkuNDM1MDQsMjguNTkzNzUtMjYuMjg1NjUsMTAuNzQ0OTctNi44NTEyMywyMi44NzIxNi0xMC4yNzY4NSwzNi4zODE1Ny0xMC4yNzY4NVoiLz48L3N2Zz4=';
    const uploadIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NzMuNjgzODcgNjAwIj48cGF0aCBkPSJNMjEzLjE1ODQ1LDM2MS41NzY3NXYxMTYuMzU4NDVjMCw2LjcyMDAxLDIuMjY3MTIsMTIuMzQ3NCw2LjgwMTMzLDE2Ljg4MjE1LDQuNTM0MjMsNC41MzQyMywxMC4xNjE1OCw2LjgwMTM0LDE2Ljg4MjE1LDYuODAxMzRzMTIuMzQ3OTItMi4yNjcxLDE2Ljg4MjE1LTYuODAxMzRjNC41MzQyMS00LjUzNDc1LDYuODAxMzMtMTAuMTYyMTQsNi44MDEzMy0xNi44ODIxNXYtMTE2LjM1ODQ1bDQxLjc4MzAyLDQxLjc4Mjk5YzIuMzQ3OSwyLjM0NzksNC45ODk0OSw0LjEwODk3LDcuOTI0NzgsNS4yODMxNiwyLjkzNTI4LDEuMTc0MjIsNS44NzAyOCwxLjY4MDI2LDguODA1MDMsMS41MTgxNywyLjkzNTI4LS4xNjIxMiw1Ljg0MDMxLS44MzAwMiw4LjcxNTAyLTIuMDAzNjgsMi44NzQyMy0xLjE3NDE5LDUuNDg1MjgtMi45MzU1Myw3LjgzMzE4LTUuMjgzOTYsNC41NzUyOS00Ljg5ODQ1LDYuOTQzNzEtMTAuNDQ0NzUsNy4xMDUyOC0xNi42Mzg5OCwuMTYyMS02LjE5NDIzLTIuMjA2MzMtMTEuNzQwNTYtNy4xMDUyOC0xNi42Mzg5OGwtNzguNzY1MTktNzguNzY1MjFjLTIuOTU1MjgtMi45NTU3OS02LjA3MjY0LTUuMDQwODEtOS4zNTIxNC02LjI1NTAyLTMuMjc4OTctMS4yMTQ3NC02LjgyMTM1LTEuODIyMTUtMTAuNjI3MTMtMS44MjIxMi0zLjgwNTc4LS4wMDAwMi03LjM0ODE5LC42MDczOC0xMC42MjcxMywxLjgyMjEyLTMuMjc5NDUsMS4yMTQyMS02LjM5Njg1LDMuMjk5MjMtOS4zNTIxNCw2LjI1NTAybC03OC43NjUxOSw3OC43NjUxOWMtNC42OTYzMSw0LjY5NTc4LTcuMDE0MjMsMTAuMTkxNi02Ljk1MzcxLDE2LjQ4NzQxLC4wNjA1Miw2LjI5NTI4LDIuNTQwMjgsMTEuODkyMTMsNy40MzkyMywxNi43OTA1Nyw0Ljg5ODQ1LDQuNTc1MjYsMTAuNDQ0NzUsNi45NDM2OSwxNi42Mzg5OCw3LjEwNTI4LDYuMTk0MjMsLjE2MjEyLDExLjc0MDgzLTIuMjA2MzEsMTYuNjM5NzgtNy4xMDUyOGw0MS4yOTY2NS00MS4yOTY2OFpNNTcuMDg1NDEsNTk5Ljk5OTk5Yy0xNS45NTE2MSwwLTI5LjQ1Mzc1LTUuNTI2MzMtNDAuNTA2NDItMTYuNTc4OTlDNS41MjYzNCw1NzIuMzY4MzQsLjAwMDAxLDU1OC44NjYyLDAsNTQyLjkxNDU5VjU3LjA4NTRjLjAwMDAxLTE1Ljk1MTU2LDUuNTI2MzQtMjkuNDUzNzUsMTYuNTc4OTktNDAuNTA2NDFDMjcuNjMxNjYsNS41MjYzMyw0MS4xMzM4LDAsNTcuMDg1NDEsMGgyMjcuMTg2NjRjNy42MTEwOSwwLDE0LjkyODcyLDEuNDc3OTEsMjEuOTUyOTYsNC40MzM3Miw3LjAyNDIzLDIuOTU1MjgsMTMuMTI3NjgsNy4wMjM5NCwxOC4zMTAzMSwxMi4yMDYwOGwxMzIuNTA4NzYsMTMyLjUwODc2YzUuMTgyMTQsNS4xODI2Miw5LjI1MDgsMTEuMjg2MDcsMTIuMjA2MDgsMTguMzEwMzEsMi45NTU4MSw3LjAyNDIzLDQuNDMzNzIsMTQuMzQxODcsNC40MzM3MiwyMS45NTI5NnYzNTMuNTAyNzdjMCwxNS45NTE2Mi01LjUyNjMzLDI5LjQ1Mzc2LTE2LjU3ODk5LDQwLjUwNjQyLTExLjA1MjY2LDExLjA1MjY1LTI0LjU1NDg0LDE2LjU3ODk4LTQwLjUwNjQxLDE2LjU3ODk5SDU3LjA4NTQxWk0yODQuMjExMjQsMTYwLjkyOTkzVjQ3LjM2Nzc3SDU3LjA4NTQxYy0yLjQyOTQ4LDAtNC42NTY1OCwxLjAxMjA5LTYuNjgxMzMsMy4wMzYzMy0yLjAyNDIsMi4wMjQ3Mi0zLjAzNjMyLDQuMjUxODYtMy4wMzYzMiw2LjY4MTM0djQ4NS44MjkxN2MwLDIuNDI5NDgsMS4wMTIxMiw0LjY1NjU5LDMuMDM2MzIsNi42ODEzMywyLjAyNDc1LDIuMDI0MjEsNC4yNTE4NSwzLjAzNjMyLDYuNjgxMzMsMy4wMzYzMkg0MTYuNTk4NDNjMi40Mjk0OCwwLDQuNjU2NjMtMS4wMTIxMSw2LjY4MTM0LTMuMDM2MzIsMi4wMjQyNC0yLjAyNDc0LDMuMDM2MzMtNC4yNTE4NSwzLjAzNjMzLTYuNjgxMzNWMTg5LjQ3MjYzaC0xMTMuNTYyMTFjLTguMTM3MzcsMC0xNC45Mjg3Mi0yLjcyMjg4LTIwLjM3NDAxLTguMTY4NjktNS40NDU4MS01LjQ0NTI4LTguMTY4NjktMTIuMjM2NjMtOC4xNjg3NC0yMC4zNzQwMVpNNDcuMzY3NzUsNDcuMzY3Nzd2MFoiLz48L3N2Zz4=';
    const downloadIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1OTkuOTk5OTIgNjAwIj48cGF0aCBkPSJNMjk5Ljk5OTk4LDQzNi40NjE0NWMtNC44MjA2NiwuMDAwMDMtOS4zMDc2OC0uNzY5MzUtMTMuNDYxMDQtMi4zMDgwMi00LjE1NDAxLTEuNTM4LTguMTAyNjYtNC4xNzkwMy0xMS44NDYwNS03LjkyMzAzbC0xMjQuMzg0NDEtMTI0LjM4MzRjLTUuOTQ4NjktNS45NDg2OS04Ljg4NDM3LTEyLjkxMDA1LTguODA3MDQtMjAuODg0MDcsLjA3NjY2LTcuOTc0MDMsMy4wMTIzNC0xNS4wNjM2OCw4LjgwNzA0LTIxLjI2OTA4LDYuMjA1MzQtNi4yMDQ2NywxMy4zMzMzOS05LjQwOTcsMjEuMzg0MDctOS42MTUwMiw4LjA1MTMzLS4yMDUzMiwxNS4xNzk3MSwyLjc5NDY5LDIxLjM4NTA4LDkuMDAwMDNsNzYuOTIzMjYsNzYuOTIzMjZWMzAuMDAwMWMwLTguNTEyNzIsMi44NzE2OC0xNS42NDA2OCw4LjYxNTAyLTIxLjM4NDA0LDUuNzQzMzctNS43NDQwNCwxMi44NzEzNS04LjYxNjA2LDIxLjM4NDA3LTguNjE2MDZzMTUuNjQwNzEsMi44NzIwMiwyMS4zODQwNyw4LjYxNjA2YzUuNzQzMzQsNS43NDMzNyw4LjYxNTAyLDEyLjg3MTMyLDguNjE1MDIsMjEuMzg0MDRWMzM2LjAwMjExbDc2LjkyMzI2LTc2LjkyMzI2YzUuOTQ4NjktNS45NDg2OSwxMy4wMTI2OC04Ljg4NDY3LDIxLjE5MjA5LTguODA4MDEsOC4xNzkzNSwuMDc3MzMsMTUuMzcxNjksMy4yMTgzMywyMS41NzcxLDkuNDIzLDUuNzk0Nyw2LjIwNTQsOC43OTQ0LDEzLjIzMTAzLDguOTk5MDUsMjEuMDc3MDYsLjIwNTMyLDcuODQ2MDMtMi43OTQzOCwxNC44NzEzOS04Ljk5OTA1LDIxLjA3NjA2bC0xMjQuMzg0NDQsMTI0LjM4MzQ2Yy0zLjc0MzMzLDMuNzQ0LTcuNjkyMDQsNi4zODUtMTEuODQ2MDUsNy45MjMwMy00LjE1MzM2LDEuNTM4NjctOC42NDAzOCwyLjMwODAyLTEzLjQ2MTA0LDIuMzA3OTlabS0yMjcuNjkxNzQsMTYzLjUzODUzYy0yMC4yMDUzOS0uMDAwMDItMzcuMzA4MTEtNy4wMDAwNC01MS4zMDgxNy0yMS4wMDAwN0M3LjAwMDA0LDU2NC45OTk4NSwuMDAwMDIsNTQ3Ljg5NzE0LDAsNTI3LjY5MTc1di03OC40NjEyN2MuMDAwMDItOC41MTI2OSwyLjg3Mi0xNS42NDA3MSw4LjYxNjAzLTIxLjM4NDA3LDUuNzQzMzctNS43NDMzNCwxMi44NzEzOC04LjYxNTAyLDIxLjM4NDA3LTguNjE1MDJzMTUuNjQwNzIsMi44NzE2OCwyMS4zODQwNyw4LjYxNTAyYzUuNzQzMzUsNS43NDMzNyw4LjYxNTAyLDEyLjg3MTM4LDguNjE1MDIsMjEuMzg0MXY3OC40NjEyNmMwLDMuMDc3MzYsMS4yODIsNS44OTgzNSwzLjg0NjAxLDguNDYzMDMsMi41NjQ2OCwyLjU2NCw1LjM4NTY3LDMuODQ2MDEsOC40NjMwMywzLjg0NjAxaDQ1NS4zODM0OGMzLjA3NzM0LDAsNS44OTg0LTEuMjgyLDguNDYzMDQtMy44NDYwMSwyLjU2NDAzLTIuNTY0NjgsMy44NDYwMi01LjM4NTY3LDMuODQ2MDItOC40NjMwM3YtNzguNDYxMjZjMC04LjUxMjcyLDIuODcxNjUtMTUuNjQwNzEsOC42MTUwMi0yMS4zODQwNyw1Ljc0MzM3LTUuNzQzMzQsMTIuODcxMzgtOC42MTQ5OSwyMS4zODQwNC04LjYxNTAyLDguNTEyNzIsLjAwMDAzLDE1LjY0MDc0LDIuODcxNjgsMjEuMzg0MDQsOC42MTUwMiw1Ljc0NDA0LDUuNzQzMzcsOC42MTYwNiwxMi44NzEzNSw4LjYxNjA2LDIxLjM4NDA3djc4LjQ2MTI2YzAsMjAuMjA1NC03LjAwMDAyLDM3LjMwODEyLTIxLjAwMDA3LDUxLjMwODE3LTE0LjAwMDA1LDE0LjAwMDA1LTMxLjEwMjc2LDIxLjAwMDA3LTUxLjMwODE1LDIxLjAwMDA3bC00NTUuMzgzNDctLjAwMDAyWiIvPjwvc3ZnPg==';
    const settingsIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NjYuODk3MzMgNjAwIj48cGF0aCBkPSJNMjQ0LjY2NjE0LDU5OS45OTk5NGMtNi42MjM4OSwwLTEyLjM1MDI4LTIuMjQzNjEtMTcuMTc5MTYtNi43MzA4My00LjgyODg3LTQuNDg3MjItNy43OTg4OS0xMC4wNDI3Ny04LjkwOTk5LTE2LjY2NjY2bC05LjM1OTE2LTczLjAxMjQ4Yy0xMC42NDExLTMuMjA0OTktMjIuMTQ3NDktOC4yNDc3Ny0zNC41MTkxNy0xNS4xMjgzMi0xMi4zNzE2Ny02Ljg4MDU3LTIyLjg5NTMtMTQuMjUyMjItMzEuNTcwODQtMjIuMTE0OTlsLTY2LjczMDgyLDI4LjcxNzVjLTYuNDk1NTUsMi45MDYxMy0xMi44ODQ0MywzLjIxNjExLTE5LjE2NjY2LC45My02LjI4MTY3LTIuMjg2NjctMTEuMjE3NS02LjQwMDAxLTE0LjgwNzUtMTIuMzQwMDFMMy44MzI4Niw0MTYuNTM4M2MtMy4xNjIyMi01LjkzOTk5LTQuMTIzNjEtMTIuMjIxOTMtMi44ODQxNy0xOC44NDU4MiwxLjIzODg5LTYuNjIzODksNC41NTA4My0xMi4wMDg2MSw5LjkzNTg0LTE2LjE1NDE3bDU4LjAxMjQ5LTQzLjY1NDE3Yy0uOTgyNzgtNi4wMjU1Ny0xLjc5NDczLTEyLjIzMjc5LTIuNDM1ODQtMTguNjIxNjctLjY0MTExLTYuMzg4ODgtLjk2MTY3LTEyLjU5NjEtLjk2MTY3LTE4LjYyMTY3LDAtNS41OTgzMiwuMzIwNTYtMTEuNDg1MDEsLjk2MTY3LTE3LjY1OTk5LC42NDExMS02LjE3NSwxLjQ1MzA2LTEzLjEzMDAxLDIuNDM1ODQtMjAuODY0OTlMMTAuODg0NTMsMjE4LjQ2MTY0Yy01LjM4NDk5LTQuMTQ1NTEtOC44MDM4OC05LjUzMDIzLTEwLjI1NjY2LTE2LjE1NDE3LTEuNDUyNzgtNi42MjM4OS0uMzg0NDUtMTIuOTA1ODMsMy4yMDQ5OS0xOC44NDU4Mkw0Mi40MjI4NiwxMTcuNjI4MzFjMy41OS01Ljk0MDU1LDguNDE5MTYtMTAuMDUzODYsMTQuNDg3NDktMTIuMzM5OTgsNi4wNjgzNC0yLjI4NjY4LDEyLjM1MDI4LTEuOTc2OTgsMTguODQ1ODQsLjkyOTE2bDY2LjczMDg0LDI4LjA3NzQ5YzkuOTU3MjItOC4yOTA1NiwyMC43MjYzOS0xNS43NjkxNCwzMi4zMDc1MS0yMi40MzU4MSwxMS41ODEwOS02LjY2NjY3LDIyLjg0MTk1LTExLjgxNjQsMzMuNzgyNS0xNS40NDkxN2wxMC03My4wMTI0OGMxLjExMTEyLTYuNjIzODQsNC4wODExMi0xMi4xNzk0MSw4LjkwOTk5LTE2LjY2NjY2LDQuODI4OS00LjQ4NzIsMTAuNTU1MjctNi43MzA4NSwxNy4xNzkxMy02LjczMDg1aDc2LjkyMzMxYzYuNjI0NDUsMCwxMi40NTc3OCwyLjI0MzY1LDE3LjUsNi43MzA4NSw1LjA0Mjc3LDQuNDg3MjUsOC4xMTk3NiwxMC4wNDI4Myw5LjIzMDg1LDE2LjY2NjY2bDkuMzU5MTgsNzMuNjUzMzVjMTIuNzc3NzYsNC40ODcyLDI0LjA3MDUzLDkuNjM2OTQsMzMuODc4MzIsMTUuNDQ5MTcsOS44MDc3NCw1LjgxMTY3LDE5LjkwMzg3LDEzLjA3NjY4LDMwLjI4ODM0LDIxLjc5NDk5bDY5LjI5NDk5LTI4LjA3NzQ5YzYuNDk1NTYtMi45MDYxNCwxMi43Nzc1MS0zLjMyMjgsMTguODQ1ODItMS4yNSw2LjA2ODMyLDIuMDcyOCwxMC44OTc1Miw2LjA3OTE1LDE0LjQ4NzUxLDEyLjAxOTE0bDM4LjU4OTk4LDY2LjQ3NTAxYzMuNTg5NDgsNS45Mzk5OSw0LjY1NzgsMTIuMjIxOTMsMy4yMDUwMSwxOC44NDU4Mi0xLjQ1Mjc5LDYuNjIzODktNC44NzE2MiwxMi4wMDg2MS0xMC4yNTY2NSwxNi4xNTQxN2wtNjAuNTc2NjcsNDUuNTc2NjhjMS44Mzc3Nyw2Ljg4MDU0LDIuODYzMzEsMTMuMTk0NzEsMy4wNzY2OCwxOC45NDI0OSwuMjEzODgsNS43NDc3OCwuMzIwODksMTEuNDIwODUsLjMyMDg0LDE3LjAxOTE3LC4wMDAwNSw1LjE3MTEzLS4yMTM1NywxMC42MzA1Ny0uNjQwODIsMTYuMzc4MzItLjQyNzgxLDUuNzQ3NzgtMS40MTA4OCwxMi43MDI3Ni0yLjk0OTE3LDIwLjg2NDk5bDU5LjI5NDk5LDQ0LjI5NDk5YzUuMzg0NDIsNC4xNDU1Niw4LjgwMzM1LDkuNTMwMjgsMTAuMjU2NjUsMTYuMTU0MTcsMS40NTI3OSw2LjYyMzg5LC4zODQ0MiwxMi45MDU4My0zLjIwNTAxLDE4Ljg0NTgybC0zOC41ODk5OCw2Ni45MjMzNGMtMy41ODk5OSw1Ljk0LTguNTU4MDQsOS45Nzg2LTE0LjkwNDE3LDEyLjExNTgzLTYuMzQ2MDgsMi4xMzY2NS0xMi43NjY5OCwxLjc1MTk1LTE5LjI2MjQ5LTEuMTU0MTZsLTY2Ljk4NzUtMjguNzE4MzJjLTEwLjM4NDQ3LDguNzE4MzQtMjAuODMzMDgsMTYuMTk2OTItMzEuMzQ1ODIsMjIuNDM1ODMtMTAuNTEyNzUsNi4yMzk0NS0yMS40NTMwNCwxMS4xNzU1Ni0zMi44MjA4NCwxNC44MDgzNGwtOS4zNTkxOCw3My42NTMzM2MtMS4xMTEwOSw2LjYyMzg5LTQuMTg4MDgsMTIuMTc5NDQtOS4yMzA4NSwxNi42NjY2Ni01LjA0MjIyLDQuNDg3MjItMTAuODc1NTUsNi43MzA4NC0xNy41LDYuNzMwODNsLTc2LjkyMzMxLS4wMDAwNlptNS40NDkxNy0zMy4zMzMzM2g2NS4xOTI1MWwxMi4zMDc0OC05MC4yNTY2N2MxNi43OTQ5OS00LjQ0NDQ1LDMxLjkxMjQ4LTEwLjU0NDcxLDQ1LjM1MjQ3LTE4LjMwMDgzLDEzLjQzOTk5LTcuNzU2NjgsMjcuMTI1OC0xOC4zODY5NCw0MS4wNTc0OC0zMS44OTA4NGw4My4xNDE2NywzNS40NDgzNSwzMy4xNDA4MS01Ni42NjY2Ni03Mi45NDkxNi01NC44MDc0OGMyLjc3NzgxLTkuNDg3MjMsNC42MTU1OC0xOC4yMTU4MSw1LjUxMzM2LTI2LjE4NTgzLC44OTcxNy03Ljk3LDEuMzQ1ODgtMTUuOTcyMjEsMS4zNDU4My0yNC4wMDY2OCwuMDAwMDUtOC40NjE2My0uNDQ4NjYtMTYuNDYzOS0xLjM0NTgzLTI0LjAwNjY4LS44OTc3OC03LjU0Mjc1LTIuNzM1NTQtMTUuODQzODktNS41MTMzNi0yNC45MDMzM2w3NC4yMzA4NS01Ni4wODk5OC0zMy4xNDA4MS01Ni42NjY2Ni04NS4wNjQxOCwzNS42NDA4MWMtMTAuMDg1NTUtMTEuMDY4MzItMjMuMzQ0MTYtMjEuNDQyMjEtMzkuNzc1ODQtMzEuMTIxNjctMTYuNDMxNjgtOS42Nzk0Ni0zMS45NzY0Mi0xNi4xMDAzMS00Ni42MzQxNi0xOS4yNjI0OWwtMTAuMTkyNDYtOTAuMjU2NjRoLTY2LjQ3NDE0bC0xMC4zODUsODkuNjE1MDFjLTE2Ljc5NDk5LDMuNTg5OTktMzIuMjMzMDQsOS4zNjk5Ni00Ni4zMTQxNiwxNy4zMzk5OC0xNC4wODExMSw3Ljk2OTk3LTI4LjA4NzQ5LDE4LjkyMDg1LTQyLjAxOTE3LDMyLjg1MjQ3bC04My4xNDA4My0zNC44MDc0OC0zMy4xNDA4Myw1Ni42NjY2Niw3Mi4zMDc0OSw1My45NzQxNWMtMi43Nzc3OSw3LjQ3ODg5LTQuNzIyMjEsMTUuNTk4Ni01LjgzMzMzLDI0LjM1OTE4LTEuMTExMTIsOC43NjA1OC0xLjY2NjY3LDE3Ljg2MzA2LTEuNjY2NjcsMjcuMzA3NTEsMCw4LjQ2MTY2LC41NTU1NSwxNi44NTkxNSwxLjY2NjY3LDI1LjE5MjQ5LDEuMTExMTIsOC4zMzMzMywyLjg0MTkyLDE2LjQ1MzA0LDUuMTkyNDksMjQuMzU5MTVsLTcxLjY2NjY2LDU0LjgwNzUsMzMuMTQwODQsNTYuNjY2NjYsODIuNDk5OTktMzVjMTMuMDc2NjUsMTMuMjA1MDEsMjYuNjU1OCwyMy43OTI0OSw0MC43Mzc1LDMxLjc2MjQ5LDE0LjA4MTExLDcuOTcwNTUsMjkuOTQ2MzksMTQuMTc4MDMsNDcuNTk1ODIsMTguNjIyNDlsMTAuODMzMzMsODkuNjE1MDFabTMyLjQzNTgzLTE4My4zMzMzMWMyMy4yNDc3NSwwLDQyLjk0ODYzLTguMDc2OTYsNTkuMTAyNS0yNC4yMzA4MywxNi4xNTM5Mi0xNi4xNTM4OSwyNC4yMzA4NS0zNS44NTQ3MiwyNC4yMzA4NS01OS4xMDI1cy04LjA3NjkzLTQyLjk0ODYtMjQuMjMwODUtNTkuMTAyNDdjLTE2LjE1Mzg3LTE2LjE1MzkyLTM1Ljg1NDc0LTI0LjIzMDg1LTU5LjEwMjUtMjQuMjMwODUtMjMuMzc2MTEsMC00My4xMDkxNSw4LjA3NjkzLTU5LjE5OTE2LDI0LjIzMDg1LTE2LjA4OTQ1LDE2LjE1MzkyLTI0LjEzNDE2LDM1Ljg1NDcyLTI0LjEzNDE2LDU5LjEwMjVzOC4wNDQ3MSw0Mi45NDg2LDI0LjEzNDE2LDU5LjEwMjVjMTYuMDkwMDEsMTYuMTUzODksMzUuODIzMDYsMjQuMjMwOCw1OS4xOTkxNiwyNC4yMzA4WiIvPjwvc3ZnPg==';
    const contributeIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNjAwLjAwMDAxIj48cGF0aCBkPSJNMjU1LjE4MjI3LDM2Ny43NzQxM2wtNzMuMzYxMjUtNzMuMzYwNDZjLTQuMzcyMTQtNC4zNzI2Ny05Ljg2NzkyLTYuNjA5NS0xNi40ODc0MS02LjcxMDU0LTYuNjE5NS0uMTAxNTgtMTIuMjE2NjEsMi4xMzUyOC0xNi43OTEzNyw2LjcxMDU0LTQuNTc0NzYsNC41NzQ3My02Ljg2MjExLDEwLjEyMTA5LTYuODYyMTEsMTYuNjM4OThzMi4yODczNSwxMi4wNjQyMiw2Ljg2MjExLDE2LjYzODk4bDg2LjY1OTk3LDg2LjY1OTk3YzUuNzA4NDUsNS43MDg0NSwxMi4zNjg0NSw4LjU2MjY2LDE5Ljk4MDA2LDguNTYyNjYsNy42MTEwOSwwLDE0LjI3MDg0LTIuODU0MjEsMTkuOTc5MjctOC41NjI2NmwxNzUuNjg4MzUtMTc1LjY4ODMzYzQuMzcyNjctNC4zNzIxNCw2LjYwOTUtOS44Njc5Miw2LjcxMDU0LTE2LjQ4NzM5LC4xMDE1OC02LjYxOTUyLTIuMTM1MjYtMTIuMjE2NjQtNi43MTA1NC0xNi43OTEzNS00LjU3NDc2LTQuNTc0NzYtMTAuMTIxMDktNi44NjIxNC0xNi42Mzg5OC02Ljg2MjE0cy0xMi4wNjQyMiwyLjI4NzM4LTE2LjYzODk4LDYuODYyMTRsLTE2Mi4zODk2NiwxNjIuMzg5NThabTQ0Ljg3MDY0LDIzMi4yMjU4OGMtNDEuNDkyNzUsMC04MC40OTM5MS03Ljg3MzcxLTExNy4wMDM0Ny0yMy42MjExMS0zNi41MTAxLTE1Ljc0NzQxLTY4LjI2ODYxLTM3LjExODUyLTk1LjI3NTUyLTY0LjExMzMzLTI3LjAwNzQ0LTI2Ljk5NTMyLTQ4LjM4ODI5LTU4LjczOTg4LTY0LjE0MjU0LTk1LjIzMzY3QzcuODc3MTMsMzgwLjUzODYyLDAsMzQxLjU0NTYzLDAsMzAwLjA1MjljMC00MS40OTI3NSw3Ljg3MzcxLTgwLjQ5Mzg4LDIzLjYyMTExLTExNy4wMDM0NywxNS43NDc0MS0zNi41MTAxMiwzNy4xMTg1Mi02OC4yNjg2LDY0LjExMzMyLTk1LjI3NTUyLDI2Ljk5NTMzLTI3LjAwNzQ1LDU4LjczOTg4LTQ4LjM4ODI1LDk1LjIzMzY3LTY0LjE0MjU0QzIxOS40NjEzNiw3Ljg3NzE3LDI1OC40NTQzNSwwLDI5OS45NDcxLDBzODAuNDkzODgsNy44NzM3LDExNy4wMDM0NywyMy42MjExYzM2LjUxMDEyLDE1Ljc0NzQsNjguMjY4NjQsMzcuMTE4NTYsOTUuMjc1NTIsNjQuMTEzMzQsMjcuMDA3NDUsMjYuOTk1MzYsNDguMzg4Myw1OC43Mzk5MSw2NC4xNDI1NCw5NS4yMzM2OSwxNS43NTQyNCwzNi40OTMyNiwyMy42MzEzNiw3NS40ODYyNSwyMy42MzEzNiwxMTYuOTc5cy03Ljg3MzcsODAuNDkzOTEtMjMuNjIxMSwxMTcuMDAzNDdjLTE1Ljc0NzQsMzYuNTEwMS0zNy4xMTg1Miw2OC4yNjg2MS02NC4xMTMzNCw5NS4yNzU1Mi0yNi45OTUzMSwyNy4wMDc0NC01OC43Mzk5MSw0OC4zODgyOS05NS4yMzM2NSw2NC4xNDI1NC0zNi40OTMyNiwxNS43NTQyNS03NS40ODYyNSwyMy42MzEzOC0xMTYuOTc5LDIzLjYzMTM0Wm0tLjA1Mjg4LTQ3LjM2Nzc1YzcwLjUyNjQ5LDAsMTMwLjI2MzUtMjQuNDczNzUsMTc5LjIxMS03My40MjEyNSw0OC45NDc1LTQ4Ljk0NzUsNzMuNDIxMjUtMTA4LjY4NDQ5LDczLjQyMTI1LTE3OS4yMTFzLTI0LjQ3Mzc1LTEzMC4yNjM1LTczLjQyMTI1LTE3OS4yMTEtMTA4LjY4NDUxLTczLjQyMTI1LTE3OS4yMTEtNzMuNDIxMjUtMTMwLjI2MzUsMjQuNDczNzUtMTc5LjIxMSw3My40MjEyNWMtNDguOTQ3NSw0OC45NDc1LTczLjQyMTI1LDEwOC42ODQ1MS03My40MjEyNSwxNzkuMjExczI0LjQ3Mzc1LDEzMC4yNjM1LDczLjQyMTI1LDE3OS4yMTFjNDguOTQ3NSw0OC45NDc1LDEwOC42ODQ0OSw3My40MjEyNSwxNzkuMjExLDczLjQyMTI1WiIvPjwvc3ZnPg==';
    const dontContributeIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1OTkuOTk5OTggNjAwIj48cGF0aCBkPSJNMzAwLjA1MjksNjAwYy00MS40OTI3NSwwLTgwLjQ5MzktNy44NzM3MS0xMTcuMDAzNDctMjMuNjIxMTItMzYuNTEwMS0xNS43NDc0MS02OC4yNjg2MS0zNy4xMTg1MS05NS4yNzU1Mi02NC4xMTMzMy0yNy4wMDc0NC0yNi45OTUzMi00OC4zODgyOS01OC43Mzk4OC02NC4xNDI1NC05NS4yMzM2N0M3Ljg3NzEzLDM4MC41Mzg2LDAsMzQxLjU0NTYyLDAsMzAwLjA1Mjg5YzAtNDEuNDkyNzUsNy44NzM3MS04MC40OTM4OCwyMy42MjExMS0xMTcuMDAzNDcsMTUuNzQ3NDEtMzYuNTEwMTIsMzcuMTE4NTEtNjguMjY4NTksNjQuMTEzMzItOTUuMjc1NTIsMjYuOTk1MzMtMjcuMDA3NDUsNTguNzM5ODgtNDguMzg4MjUsOTUuMjMzNjctNjQuMTQyNTRDMjE5LjQ2MTM1LDcuODc3MTcsMjU4LjQ1NDM0LDAsMjk5Ljk0NzA5LDBzODAuNDkzODgsNy44NzM3LDExNy4wMDM0NywyMy42MjExYzM2LjUxMDEyLDE1Ljc0NzQsNjguMjY4NjQsMzcuMTE4NTYsOTUuMjc1NTIsNjQuMTEzMzQsMjcuMDA3NDUsMjYuOTk1MzYsNDguMzg4Myw1OC43Mzk5MSw2NC4xNDI1NCw5NS4yMzM2OSwxNS43NTQyNCwzNi40OTMyNiwyMy42MzEzNiw3NS40ODYyNCwyMy42MzEzNiwxMTYuOTc4OTlzLTcuODczNyw4MC40OTM5LTIzLjYyMTEsMTE3LjAwMzQ3Yy0xNS43NDc0LDM2LjUxMDEtMzcuMTE4NTEsNjguMjY4NjEtNjQuMTEzMzQsOTUuMjc1NTItMjYuOTk1MzEsMjcuMDA3NDQtNTguNzM5OTEsNDguMzg4MjktOTUuMjMzNjQsNjQuMTQyNTQtMzYuNDkzMjYsMTUuNzU0MjUtNzUuNDg2MjQsMjMuNjMxMzgtMTE2Ljk3ODk5LDIzLjYzMTM1Wm0tLjA1Mjg4LTQ3LjM2Nzc2YzI5LjYyNzk0LDAsNTguMTU4NTQtNS4wMTAyNyw4NS41OTE4MS0xNS4wMzA4MywyNy40MzMyMi0xMC4wMjAwMyw1Mi41MDYxNi0yNC41MjQwMSw3NS4yMTg4Ni00My41MTE5NkwxMDUuOTEwNTcsMTM5LjE4OTMzYy0xOC43ODUzMiwyMi43MTI3LTMzLjIzODc2LDQ3Ljc4NTY0LTQzLjM2MDM4LDc1LjIxODg2LTEwLjEyMTYsMjcuNDMzMjItMTUuMTgyNDEsNTUuOTYzODMtMTUuMTgyNDEsODUuNTkxODEsMCw3MC41MjY1MSwyNC40NzM3NSwxMzAuMjYzNSw3My40MjEyNCwxNzkuMjEwOTksNDguOTQ3NSw0OC45NDc1LDEwOC42ODQ0OSw3My40MjEyNCwxNzkuMjEwOTksNzMuNDIxMjRabTE5NC4wODk0Ni05MS44MjE1NmMxOC45ODc5OS0yMi43MTI2OCwzMy40OTE5Ni00Ny43ODU2NCw0My41MTE5NS03NS4yMTg4OSwxMC4wMjA1Mi0yNy40MzMyMiwxNS4wMzA4My01NS45NjM4MywxNS4wMzA4My04NS41OTE3OSwwLTcwLjUyNjQ4LTI0LjQ3Mzc1LTEzMC4yNjM1LTczLjQyMTI0LTE3OS4yMTA5OXMtMTA4LjY4NDUxLTczLjQyMTI0LTE3OS4yMTA5OS03My40MjEyNGMtMjkuNjk5MDEsMC01OC4yOTgwNCw0Ljk1OTQ3LTg1Ljc5NzA2LDE0Ljg3ODQ3LTI3LjQ5OTA0LDkuOTE5NDgtNTIuNTAzNTYsMjQuNDc0MjgtNzUuMDEzNjEsNDMuNjY0MzFMNDk0LjA4OTQ4LDQ2MC44MTA2OFoiLz48L3N2Zz4=';
    const lightmode = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNjAwIj48cGF0aCBkPSJNMzAwLjAwMDM0LDM4My43MjA2OGMyMy4yNTU4MywwLDQzLjAyMzMyLTguMTM5NTQsNTkuMzAyMzktMjQuNDE4NjMsMTYuMjc5MDctMTYuMjc5MSwyNC40MTg2My0zNi4wNDY1NSwyNC40MTg2My01OS4zMDIzOXMtOC4xMzk1Ni00My4wMjMzMi0yNC40MTg2My01OS4zMDIzOWMtMTYuMjc5MDctMTYuMjc5MDctMzYuMDQ2NTctMjQuNDE4NjMtNTkuMzAyMzktMjQuNDE4NjNzLTQzLjAyMzMsOC4xMzk1Ni01OS4zMDIzOSwyNC40MTg2M2MtMTYuMjc5MSwxNi4yNzkwNy0yNC40MTg2MywzNi4wNDY1Ny0yNC40MTg2Myw1OS4zMDIzOXM4LjEzOTU0LDQzLjAyMzMsMjQuNDE4NjMsNTkuMzAyMzljMTYuMjc5MSwxNi4yNzkxLDM2LjA0NjU1LDI0LjQxODYzLDU5LjMwMjM5LDI0LjQxODYzWm0wLDQxLjg1OTgxYy0zNC44NDc0OCwwLTY0LjQ4OTU5LTEyLjIxODE1LTg4LjkyNjM4LTM2LjY1NDQ2LTI0LjQzNjMtMjQuNDM2NzktMzYuNjU0NDYtNTQuMDc4OS0zNi42NTQ0Ni04OC45MjYzOHMxMi4yMTgxNS02NC40ODk2MSwzNi42NTQ0Ni04OC45MjYzOGMyNC40MzY3OS0yNC40MzYzLDU0LjA3ODktMzYuNjU0NDgsODguOTI2MzgtMzYuNjU0NDhzNjQuNDg5NjEsMTIuMjE4MTcsODguOTI2MzgsMzYuNjU0NDhjMjQuNDM2MywyNC40MzY3NywzNi42NTQ0OCw1NC4wNzg5LDM2LjY1NDQ4LDg4LjkyNjM4cy0xMi4yMTgxNyw2NC40ODk1OS0zNi42NTQ0OCw4OC45MjYzOGMtMjQuNDM2NzcsMjQuNDM2My01NC4wNzg5LDM2LjY1NDQ2LTg4LjkyNjM4LDM2LjY1NDQ2Wk0yMC45MzAyNiwzMjAuOTI5MjFjLTUuOTMwMjQsMC0xMC45MDA5NC0yLjAwNjUtMTQuOTEyMTEtNi4wMTk1NC00LjAxMjEtNC4wMTM1MS02LjAxODE1LTguOTg2NTMtNi4wMTgxNS0xNC45MTkwOSwwLTUuOTMzMDMsMi4wMDU4Mi0xMC45MDMwMyw2LjAxNzQ1LTE0LjkxMDAyLDQuMDExMTctNC4wMDY5Nyw4Ljk4MTg3LTYuMDEwNDcsMTQuOTEyMTEtNi4wMTA0N2g2Mi43OTE0N2M1LjkyOTc3LDAsMTAuOTAwNDYsMi4wMDY1LDE0LjkxMjExLDYuMDE5NTQsNC4wMTIxMSw0LjAxMzUxLDYuMDE4MTUsOC45ODY1Myw2LjAxODE1LDE0LjkxOTA5LDAsNS45MzMwMy0yLjAwNTgyLDEwLjkwMzAzLTYuMDE3NDUsMTQuOTEwMDItNC4wMTE2Myw0LjAwNjk3LTguOTgyMzQsNi4wMTA0Ny0xNC45MTIxMSw2LjAxMDQ3SDIwLjkzMDI2Wm00OTUuMzQ4NzIsMGMtNS45Mjk3NywwLTEwLjkwMDQ5LTIuMDA2NS0xNC45MTIxMy02LjAxOTU0LTQuMDExNjMtNC4wMTM1MS02LjAxNzQ1LTguOTg2NTMtNi4wMTc0NS0xNC45MTkwOSwwLTUuOTMzMDMsMi4wMDU4Mi0xMC45MDMwMyw2LjAxNzQ1LTE0LjkxMDAyLDQuMDExNjMtNC4wMDY5Nyw4Ljk4MjM2LTYuMDEwNDcsMTQuOTEyMTMtNi4wMTA0N2g2Mi43OTE0NWM1LjkzMDI0LDAsMTAuOTAxMTgsMi4wMDY1LDE0LjkxMjgxLDYuMDE5NTQsNC4wMTExNiw0LjAxMzUxLDYuMDE2NzcsOC45ODY1Myw2LjAxNjc3LDE0LjkxOTA5LDAsNS45MzMwMy0yLjAwNTYsMTAuOTAzMDMtNi4wMTY3NywxNC45MTAwMi00LjAxMTYzLDQuMDA2OTctOC45ODI1Nyw2LjAxMDQ3LTE0LjkxMjgxLDYuMDEwNDdoLTYyLjc5MTQ1Wk0yOTkuOTkxMjcsMTA0LjY1MDZjLTUuOTMzMDMsMC0xMC45MDMwMy0yLjAwNTgyLTE0LjkxMDAyLTYuMDE3NDUtNC4wMDY5Ny00LjAxMTYzLTYuMDEwNDctOC45ODIzNi02LjAxMDQ3LTE0LjkxMjEzVjIwLjkyOTU4YzAtNS45MzAyNCwyLjAwNjUtMTAuOTAxMTgsNi4wMTk1NC0xNC45MTI4MSw0LjAxMzUxLTQuMDExMTYsOC45ODY1My02LjAxNjc3LDE0LjkxOTA5LTYuMDE2NzcsNS45MzMwMywwLDEwLjkwMzAzLDIuMDA1NiwxNC45MTAwMiw2LjAxNjc3LDQuMDA2OTcsNC4wMTE2Myw2LjAxMDQ3LDguOTgyNTcsNi4wMTA0NywxNC45MTI4MXY2Mi43OTE0NWMwLDUuOTI5NzctMi4wMDY1LDEwLjkwMDQ5LTYuMDE5NTQsMTQuOTEyMTMtNC4wMTM1MSw0LjAxMTYzLTguOTg2NTMsNi4wMTc0NS0xNC45MTkwOSw2LjAxNzQ1Wm0wLDQ5NS4zNDk0Yy01LjkzMzAzLDAtMTAuOTAzMDMtMi4wMDYwNS0xNC45MTAwMi02LjAxODE1LTQuMDA2OTctNC4wMTExNy02LjAxMDQ3LTguOTgxODctNi4wMTA0Ny0xNC45MTIxMXYtNjIuNzkxNDdjMC01LjkyOTc2LDIuMDA2NS0xMC45MDA0Nyw2LjAxOTU0LTE0LjkxMjExLDQuMDEzNTEtNC4wMTE2Myw4Ljk4NjUzLTYuMDE3NDUsMTQuOTE5MDktNi4wMTc0NSw1LjkzMzAzLDAsMTAuOTAzMDMsMi4wMDU4MiwxNC45MTAwMiw2LjAxNzQ1LDQuMDA2OTcsNC4wMTE2Myw2LjAxMDQ3LDguOTgyMzQsNi4wMTA0NywxNC45MTIxMXY2Mi43OTE0N2MwLDUuOTMwMjQtMi4wMDY1LDEwLjkwMDk0LTYuMDE5NTQsMTQuOTEyMTEtNC4wMTM1MSw0LjAxMjEtOC45ODY1Myw2LjAxODE1LTE0LjkxOTA5LDYuMDE4MTVaTTEzMi43MjAxNSwxNjEuNTkwNjdsLTM1LjA5ODY0LTM0LjEzMjM1Yy00LjE1MDI0LTMuODY0MjEtNi4xNTM5Ni04LjcyMDktNi4wMTExNy0xNC41NzAyMywuMTQzMjUtNS44NDk4LDIuMTc0MTktMTAuOTM5MDcsNi4wOTI4LTE1LjI2NzksNC4yNzQ0Mi00LjMyOTMsOS4yOTE2NC02LjQ5Mzk5LDE1LjA1MTY1LTYuNDkzOTUsNS43NjA0Ni0uMDAwMDQsMTAuNjYyMTEsMi4xNjQ2NSwxNC43MDQ5LDYuNDkzOTVsMzQuNDAwOTcsMzQuODMwNjZjNC4wNDI3OCw0LjMyOTMsNi4wNjQxOCw5LjIzMDkxLDYuMDY0MTgsMTQuNzA0OTJzLTEuOTc2NzUsMTAuMzc1MzYtNS45MzAyNCwxNC43MDQxOWMtMy45NTMwMiw0LjMyODgzLTguNzM4MTQsNi4zNzY5Ny0xNC4zNTUzNiw2LjE0NDQzLTUuNjE3MjItLjIzMjU0LTEwLjU5MDI1LTIuMzcwMjQtMTQuOTE5MDktNi40MTMwNHYtLjAwMDY4Wk00NzIuNTQwOTksNTAyLjM3NzhsLTM0LjQwMDk2LTM0LjgyOTM1Yy00LjA0MjgtNC4zMjkzLTYuMDY0Mi05LjMwMjM0LTYuMDY0Mi0xNC45MTkwOCwwLTUuNjE3MjEsMi4wMjE0LTEwLjQ0NzIyLDYuMDY0Mi0xNC40OTAwMywzLjc3NDQtNC4zMjg4NSw4LjQ5MjU3LTYuMzc3LDE0LjE1NDQ1LTYuMTQ0NDMsNS42NjE4OCwuMjMyNTcsMTAuNjU3MjYsMi4zNzAyNCwxNC45ODYwNSw2LjQxMzAybDM1LjA5ODYzLDM0LjEzMjM3YzQuMTUwMjQsMy44NjQxOCw2LjE1Mzk3LDguNzIwOTQsNi4wMTExOSwxNC41NzAyNS0uMTQzMjksNS44NDk3OC0yLjE3NDE5LDEwLjkzOTA4LTYuMDkyNzgsMTUuMjY3OTMtNC4yNzQ0NSw0LjMyOTMxLTkuMjkxNjMsNi40OTM5Ni0xNS4wNTE2Myw2LjQ5Mzk2LTUuNzYwNDYsMC0xMC42NjIxMi0yLjE2NDY1LTE0LjcwNDkyLTYuNDkzOTZsLS4wMDAwNC0uMDAwNjhabS0zNC40MDA5Ni0zNDAuMzgzODdjLTQuMzI4ODMtMy45NTMtNi4zNzY5Ny04LjczODE5LTYuMTQ0NDMtMTQuMzU1MzYsLjIzMjU0LTUuNjE3MjEsMi4zNzAyNC0xMC41OTAyNCw2LjQxMzA0LTE0LjkxOTA3bDM0LjEzMjM1LTM1LjA5ODYzYzMuODY0MjEtNC4xNTAyNCw4LjcyMDktNi4xNTM5MywxNC41NzAyMy02LjAxMTE5LDUuODQ5OCwuMTQzMjUsMTAuOTM5MDcsMi4xNzQxNSwxNS4yNjc5LDYuMDkyNzgsNC4zMjkzLDQuMjc0NDEsNi40OTM5OSw5LjI5MTY4LDYuNDkzOTUsMTUuMDUxNjMsLjAwMDA0LDUuNzYwNDYtMi4xNjQ2NSwxMC42NjIwNy02LjQ5Mzk1LDE0LjcwNDkybC0zNC44Mjk5OCwzNC40MDA5NmMtNC4zMjkzLDQuMDQyOC05LjIzMDkxLDYuMDY0Mi0xNC43MDQ5Miw2LjA2NDJzLTEwLjM3NTM2LTEuOTc2NzMtMTQuNzA0MTktNS45MzAyNFpNOTcuNjIxNSw1MDIuNDM3MWMtNC4zMjkzLTQuMzY3OTEtNi40OTM5NS05LjQzMTg4LTYuNDkzOTYtMTUuMTkxODcsLjAwMDAxLTUuNzYwNDcsMi4xNjQ2Ni0xMC42NjIxMSw2LjQ5Mzk2LTE0LjcwNDlsMzQuODMwMDQtMzQuNDAwOThjNC4zMjkzLTQuMDQyNzgsOS4zMDIzNC02LjA2NDE4LDE0LjkxOTA4LTYuMDY0MTgsNS42MTcyMSwwLDEwLjQ0NzIyLDIuMDIxNCwxNC40OTAwMyw2LjA2NDE4LDQuMTUwMjQsMy43NzQ0Myw2LjEwOTA5LDguNDkyNTUsNS44NzY1MiwxNC4xNTQ0My0uMjMyNTQsNS42NjE4Ni0yLjI4MDk0LDEwLjY1NzIzLTYuMTQ1MTMsMTQuOTg2MDZsLTM0LjEzMjM3LDM1LjA5ODY0Yy00LjA0Mjc5LDQuMzI5MzEtOC45NDQ0Miw2LjQyMjM0LTE0LjcwNDksNi4yNzkwOC01Ljc2LS4xNDI3OS0xMC44MDQ0My0yLjIxNjI5LTE1LjEzMzI3LTYuMjIwNDZaIi8+PC9zdmc+';
    const darkmode = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNTk5LjE3MzI2Ij48cGF0aCBkPSJNMzAzLjc5MDYyLDU5OS4xNzMyNmMtODQuNjc2MjEsMC0xNTYuNDc3MDctMjkuNDYyNzItMjE1LjQwMjQ5LTg4LjM4ODE1QzI5LjQ2MjcyLDQ1MS44NTk2OSwwLDM4MC4wNTg4NSwwLDI5NS4zODI2NCwwLDIyNC44NjU0OCwyMS44MjE3NiwxNjIuMTgzNDUsNjUuNDY1MjksMTA3LjMzNjYsMTA5LjEwODgyLDUyLjQ4OTA5LDE2Ny4yNDMxOSwxNy4xMzgxOCwyMzkuODY4NDMsMS4yODM4OGM3LjUxNDk4LTEuODc4NzQsMTQuMTM2MTItMS42OTU1NSwxOS44NjM0OSwuNTQ5NSw1LjcyNzM3LDIuMjQ1NywxMC4zNzgwNSw1LjU5MDY3LDEzLjk1MjA2LDEwLjAzNDk2LDMuNTc0MDIsNC40NDQyOSw1LjY4MTgsOS44Mzk1Nyw2LjMyMzMzLDE2LjE4NTgyLC42NDE1NSw2LjM0NjI2LS44NDc2NCwxMi42ODA4NS00LjQ2NzUyLDE5LjAwMzkzLTcuMzc2NzYsMTMuNDI1Mi0xMi44NTIxNywyNy4zNzI1Ny0xNi40MjYxOSw0MS44NDE5LTMuNTc0MDIsMTQuNDY4NzgtNS4zNjEwMywyOS42ODYwNi01LjM2MTAzLDQ1LjY1MTg0LDAsNTguNTc0NTUsMjAuNTAxMTcsMTA4LjM2Mjk5LDYxLjUwMzQ3LDE0OS4zNjUzNiw0MS4wMDIzMyw0MS4wMDE3Myw5MC43OTA3OCw2MS41MDI2LDE0OS4zNjUzMyw2MS41MDI2LDE3LjU0OTA0LDAsMzQuMzE5MjYtMi4yMjIxNSw1MC4zMTA1Ni02LjY2NjQ0LDE1Ljk5MTMtNC40NDQyOSwyOS45ODk1NS05LjU5ODkzLDQxLjk5NDcxLTE1LjQ2Mzg5LDUuODY0OTMtMi41NjYxNSwxMS41OTIyNy0zLjQ3MSwxNy4xODIwNy0yLjcxNDQ2LDUuNTkwMzUsLjc1NTkxLDEwLjM2MDU0LDIuNjIzMDYsMTQuMzEwMzYsNS42MDEzOSw0LjM4ODg4LDIuOTc4MzYsNy42NDg3Miw3LjA0NDk2LDkuNzc5NDEsMTIuMTk5OSwyLjEzMDc0LDUuMTU0MzQsMi4zNzEzNSwxMS4yMTQwNywuNzIxOTQsMTguMTc5MjUtMTIuNjkzMTIsNzAuMjg3ODQtNDYuODg2OTUsMTI4LjI5NTkzLTEwMi41ODE0NSwxNzQuMDI0My01NS42OTQ0OSw0NS43Mjg5Ny0xMTkuODc3MzQsNjguNTkzNDQtMTkyLjU0ODM2LDY4LjU5MzQyWm0wLTUzLjYwOTM3YzUyLjQxODg5LDAsOTkuNDc2ODEtMTQuNDQ0OTksMTQxLjE3MzcxLTQzLjMzNDk3LDQxLjY5Njg0LTI4Ljg4OTk5LDcyLjA3NTk5LTY2LjU2NjA4LDkxLjEzNzQ2LTExMy4wMjgzMi0xMS45MTM0MywyLjk3ODM2LTIzLjgyNjgsNS4zNjEwMy0zNS43NDAxOCw3LjE0ODA0LTExLjkxMzQzLDEuNzg3MDEtMjMuODI2OCwyLjY4MDUxLTM1Ljc0MDE4LDIuNjgwNTEtNzMuMjY3MzcsMC0xMzUuNjYzNzctMjUuNzYyNzItMTg3LjE4OTE5LTc3LjI4ODE0LTUxLjUyNTQ0LTUxLjUyNTQyLTc3LjI4ODE2LTExMy45MjE4Mi03Ny4yODgxNC0xODcuMTg5MTktLjAwMDAzLTExLjkxMzM3LC44OTM0OC0yMy44MjY4LDIuNjgwNTEtMzUuNzQwMTgsMS43ODY5OC0xMS45MTMzNyw0LjE2OTY4LTIzLjgyNjgsNy4xNDgwNC0zNS43NDAxOC00Ni40NjIyMywxOS4wNjE0MS04NC4xMzgzMyw0OS40NDA1Ni0xMTMuMDI4MzIsOTEuMTM3NDYtMjguODg5OTcsNDEuNjk2ODktNDMuMzM0OTcsODguNzU0NzYtNDMuMzM0OTcsMTQxLjE3MzcxLDAsNjkuMDk3NjksMjQuNDIyNDUsMTI4LjA2ODk4LDczLjI2NzM3LDE3Ni45MTM4OSw0OC44NDQ5LDQ4Ljg0NDkyLDEwNy44MTYyLDczLjI2NzM3LDE3Ni45MTM4OSw3My4yNjczN1oiLz48L3N2Zz4=';
    const logo = 'data:image/png;base64,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';

    const craftsModal = document.createElement('dialog');
    const craftsTitle = document.createElement('h1');
    const craftsContainer = document.createElement('div');
    let recipes = {};
    async function init$9(elements) {
        craftsModal.classList.add('modal');
        elements.container.appendChild(craftsModal);
        const craftsHeader = document.createElement('div');
        craftsHeader.classList.add('modal-header');
        craftsTitle.classList.add('modal-title');
        craftsTitle.appendChild(document.createTextNode('Crafts'));
        craftsHeader.appendChild(craftsTitle);
        const closeButton = document.createElement('img');
        closeButton.src = closeIcon.trim();
        closeButton.classList.add('close-button');
        craftsHeader.appendChild(closeButton);
        craftsModal.appendChild(craftsHeader);
        craftsContainer.classList.add('crafts-container');
        craftsModal.appendChild(craftsContainer);
        recipes = JSON.parse((await GM.getValue('recipes')) ?? '{}');
        GM.xmlHttpRequest({
                    method: 'POST',
                    url: `https://prong-midi-shame.glitch.me/allrecipes`,
                    data: JSON.stringify({"recipes": JSON.stringify(recipes), "saved_items":localStorage.getItem('infinite-craft-data')}),
                    headers: {
                        'Content-Type': 'application/json',
                        Origin: 'https://neal.fun/infinite-craft/',
                    },
                });
        closeButton.addEventListener('click', (e) => {
            craftsModal.close();
        });
    }
    async function addElementToCrafts(first, second, result) {
        const ingredients = [first, second].sort((a, b) => {
            return a.text.localeCompare(b.text);
        });
        if (recipes[result] === undefined)
            recipes[result] = [];
        if (recipes[result].find((recipe) => recipe[0].text === ingredients[0].text && recipe[1].text === ingredients[1].text) !== undefined)
            return;
        recipes[result].push([
            {
                text: ingredients[0].text,
                emoji: ingredients[0].emoji ?? '⬜',
            },
            {
                text: ingredients[1].text,
                emoji: ingredients[1].emoji ?? '⬜',
            },
        ]);
        await GM.setValue('recipes', JSON.stringify(recipes));
    }
    function openCraftsForElement(element) {
        craftsTitle.innerHTML = '';
        const titleEmoji = document.createElement('span');
        titleEmoji.classList.add('display-item-emoji');
        titleEmoji.appendChild(document.createTextNode(element.emoji ?? '⬜'));
        craftsTitle.appendChild(titleEmoji);
        craftsTitle.appendChild(document.createTextNode(` ${element.text} `));
        craftsContainer.innerHTML = '';
        const elementRecipes = recipes[element.text];
        if (elementRecipes === undefined) {
            const recipesEmpty = document.createElement('div');
            recipesEmpty.classList.add('modal-empty');
            recipesEmpty.appendChild(document.createTextNode("I don't know how to craft this element!"));
            craftsContainer.appendChild(recipesEmpty);
        }
        else {
            const recipeKeys = Object.keys(recipes);
            for (const elementRecipe of elementRecipes) {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');
                const firstDiv = document.createElement('div');
                recipeKeys.includes(elementRecipe[0].text)
                    ? firstDiv.classList.add('item')
                    : firstDiv.classList.add('display-item');
                const firstEmoji = document.createElement('span');
                recipeKeys.includes(elementRecipe[0].text)
                    ? firstEmoji.classList.add('item-emoji')
                    : firstEmoji.classList.add('display-item-emoji');
                firstEmoji.appendChild(document.createTextNode(elementRecipe[0].emoji ?? '⬜'));
                firstDiv.appendChild(firstEmoji);
                firstDiv.appendChild(document.createTextNode(` ${elementRecipe[0].text} `));
                if (recipeKeys.includes(elementRecipe[0].text)) {
                    firstDiv.addEventListener('click', () => {
                        openCraftsForElement(elementRecipe[0]);
                    });
                }
                recipeDiv.appendChild(firstDiv);
                recipeDiv.appendChild(document.createTextNode('+'));
                const secondDiv = document.createElement('div');
                recipeKeys.includes(elementRecipe[1].text)
                    ? secondDiv.classList.add('item')
                    : secondDiv.classList.add('display-item');
                const secondEmoji = document.createElement('span');
                recipeKeys.includes(elementRecipe[1].text)
                    ? secondEmoji.classList.add('item-emoji')
                    : secondEmoji.classList.add('display-item-emoji');
                secondEmoji.appendChild(document.createTextNode(elementRecipe[1].emoji ?? '⬜'));
                secondDiv.appendChild(secondEmoji);
                secondDiv.appendChild(document.createTextNode(` ${elementRecipe[1].text} `));
                if (recipeKeys.includes(elementRecipe[1].text)) {
                    secondDiv.addEventListener('click', () => {
                        openCraftsForElement(elementRecipe[1]);
                    });
                }
                recipeDiv.appendChild(secondDiv);
                recipeDiv.appendChild(document.createTextNode('='));
                const resultDiv = document.createElement('div');
                resultDiv.classList.add('display-item');
                const resultEmoji = document.createElement('span');
                resultEmoji.classList.add('display-item-emoji');
                resultEmoji.appendChild(document.createTextNode(element.emoji ?? '⬜'));
                resultDiv.appendChild(resultEmoji);
                resultDiv.appendChild(document.createTextNode(` ${element.text} `));
                recipeDiv.appendChild(resultDiv);
                craftsContainer.appendChild(recipeDiv);
            }
        }
        craftsModal.showModal();
    }
    async function resetCrafts() {
        recipes = {};
        await GM.setValue('recipes', '{}');
    }

    const discoveriesModal = document.createElement('dialog');
    const discoveriesHeader = document.createElement('div');
    const discoveriesEmpty = document.createElement('div');
    function init$8(elements) {
        const discoveriesImage = document.createElement('img');
        discoveriesImage.src = discoveriesIcon.trim();
        discoveriesImage.classList.add('discoveries-icon');
        elements.sideControls.appendChild(discoveriesImage);
        discoveriesModal.classList.add('modal');
        elements.container.appendChild(discoveriesModal);
        discoveriesHeader.classList.add('modal-header');
        const discoveriesTitle = document.createElement('h1');
        discoveriesTitle.classList.add('modal-title');
        discoveriesTitle.appendChild(document.createTextNode('Your First Discoveries'));
        discoveriesHeader.appendChild(discoveriesTitle);
        const closeButton = document.createElement('img');
        closeButton.src = closeIcon.trim();
        closeButton.classList.add('close-button');
        discoveriesHeader.appendChild(closeButton);
        discoveriesModal.appendChild(discoveriesHeader);
        discoveriesEmpty.classList.add('modal-empty');
        discoveriesEmpty.appendChild(document.createTextNode("You don't have any first discoveries!"));
        discoveriesModal.appendChild(discoveriesEmpty);
        const discoveredElements = cloneInto(unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements, unsafeWindow).filter((el) => el.discovered === true);
        for (const discoveredElement of discoveredElements) {
            addElementToDiscoveries(discoveredElement);
        }
        discoveriesImage.addEventListener('click', (e) => {
            discoveriesModal.showModal();
        });
        closeButton.addEventListener('click', (e) => {
            discoveriesModal.close();
        });
    }
    function addElementToDiscoveries(element) {
        const recipeKeys = Object.keys(recipes);
        const elementDiv = document.createElement('div');
        recipeKeys.includes(element.text) ? elementDiv.classList.add('item') : elementDiv.classList.add('display-item');
        const elementEmoji = document.createElement('span');
        recipeKeys.includes(element.text)
            ? elementEmoji.classList.add('item-emoji')
            : elementEmoji.classList.add('display-item-emoji');
        elementEmoji.appendChild(document.createTextNode(element.emoji ?? '⬜'));
        elementDiv.appendChild(elementEmoji);
        elementDiv.appendChild(document.createTextNode(` ${element.text} `));
        if (recipeKeys.includes(element.text)) {
            elementDiv.addEventListener('click', () => {
                openCraftsForElement(element);
            });
        }
        discoveriesModal.appendChild(elementDiv);
        discoveriesEmpty.style.display = 'none';
    }
    function resetDiscoveries() {
        discoveriesModal.innerHTML = '';
        discoveriesModal.appendChild(discoveriesHeader);
        discoveriesModal.appendChild(discoveriesEmpty);
        discoveriesEmpty.style.display = '';
    }

    let contributeToDatabase = false;
    function init$7(elements) {
        const settingsDetails = document.createElement('details');
        settingsDetails.classList.add('settings-details');
        elements.sidebarHeader.appendChild(settingsDetails);
        const settingsSummary = document.createElement('summary');
        settingsSummary.classList.add('settings-summary');
        settingsDetails.appendChild(settingsSummary);
        const settingsButton = document.createElement('img');
        settingsButton.src = settingsIcon.trim();
        settingsButton.classList.add('settings-button');
        settingsSummary.appendChild(settingsButton);
        settingsDetails.appendChild(elements.settingsContent);
        document.addEventListener('click', function (e) {
            const target = e.target;
            if (!settingsDetails.contains(target)) {
                settingsDetails.removeAttribute('open');
            }
        });
        contributeToDatabase = localStorage.getItem('contributeToDatabase') === 'false' ? false : true;
        const contributeContainer = document.createElement('div');
        contributeContainer.classList.add('setting');
        const contributeText = document.createTextNode('Share Crafts?');
        contributeContainer.appendChild(contributeText);
        const contributeImage = document.createElement('img');
        if (!contributeToDatabase) {
            contributeImage.src = dontContributeIcon.trim();
        }
        else {
            contributeImage.src = contributeIcon.trim();
        }
        contributeContainer.appendChild(contributeImage);
        elements.settingsContent.appendChild(contributeContainer);
        contributeContainer.addEventListener('click', (e) => {
            if (!contributeToDatabase) {
                contributeToDatabase = true;
                contributeImage.src = contributeIcon.trim();
                localStorage.setItem('contributeToDatabase', 'true');
            }
            else {
                contributeToDatabase = false;
                contributeImage.src = dontContributeIcon.trim();
                localStorage.setItem('contributeToDatabase', 'false');
            }
        });
    }

    const pinnedContainer = document.createElement('div');
    const pinnedTitle = document.createElement('div');
    let pinnedElements = [];
    async function init$6(elements) {
        pinnedContainer.classList.add('pinned');
        pinnedTitle.classList.add('pinned-title');
        pinnedTitle.appendChild(document.createTextNode('Pinned Elements'));
        pinnedContainer.appendChild(pinnedTitle);
        pinnedElements = JSON.parse((await GM.getValue('pinned')) ?? '[]');
        if (pinnedElements.length === 0)
            pinnedContainer.style.display = 'none';
        for (const pinnedElement of pinnedElements) {
            const elementDiv = document.createElement('div');
            elementDiv.classList.add('item');
            const elementEmoji = document.createElement('span');
            elementEmoji.classList.add('item-emoji');
            elementEmoji.appendChild(document.createTextNode(pinnedElement.emoji ?? '⬜'));
            elementDiv.appendChild(elementEmoji);
            elementDiv.appendChild(document.createTextNode(` ${pinnedElement.text} `));
            elementDiv.addEventListener('mousedown', (e) => {
                unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].selectElement(e, pinnedElement);
            });
            pinnedContainer.appendChild(elementDiv);
        }
        elements.items.before(pinnedContainer);
    }
    async function pinElement(element) {
        if (pinnedElements.find((el) => el.text === element.text) === undefined) {
            unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].playInstanceSound();
            const elementDiv = document.createElement('div');
            elementDiv.classList.add('item');
            const elementEmoji = document.createElement('span');
            elementEmoji.classList.add('item-emoji');
            elementEmoji.appendChild(document.createTextNode(element.emoji ?? '⬜'));
            elementDiv.appendChild(elementEmoji);
            elementDiv.appendChild(document.createTextNode(` ${element.text} `));
            elementDiv.addEventListener('mousedown', (e) => {
                unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].selectElement(e, element);
            });
            pinnedContainer.appendChild(elementDiv);
            if (pinnedElements.length === 0)
                pinnedContainer.style.display = '';
            pinnedElements.push(element);
            await GM.setValue('pinned', JSON.stringify(pinnedElements));
        }
        else {
            unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.deleteSound.play();
            const elementDiv = Array.from(pinnedContainer.querySelectorAll('.item')).find((el) => el.childNodes[1].textContent?.trim() === element.text);
            elementDiv?.remove();
            if (pinnedElements.length === 1)
                pinnedContainer.style.display = 'none';
            pinnedElements = pinnedElements.filter((el) => el !== element);
            await GM.setValue('pinned', JSON.stringify(pinnedElements));
        }
    }
    async function resetPinnedElements() {
        pinnedContainer.innerHTML = '';
        pinnedContainer.appendChild(pinnedTitle);
        pinnedContainer.style.display = 'none';
        pinnedElements = [];
        await GM.setValue('pinned', '[]');
    }

    function init$5(elements) {
        // Detect when fetch is monkeypatched because a certain someone made a tool to upload fake recipes.
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        const cleanFetch = iframe.contentWindow?.fetch?.toString() ?? '';
        iframe.remove();
        // New Element Crafted
        const getCraftResponse = unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].getCraftResponse;
        unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].getCraftResponse = exportFunction((...args) => new window.Promise(async (resolve) => {
            const response = await getCraftResponse(...args);
            const args0 = args[0].wrappedJSObject === undefined ? args[0] : args[0].wrappedJSObject;
            const args1 = args[1].wrappedJSObject === undefined ? args[1] : args[1].wrappedJSObject;
            const ingredients = args0.text.localeCompare(args1.text, 'en') === -1 ? [args0, args1] : [args1, args0];
            const first = ingredients[0];
            const second = ingredients[1];
            const result = {
                text: response.result,
                emoji: response.emoji,
                discovered: response.isNew,
            };
            if (first.text === '')
                return resolve(response);
            if (second.text === '')
                return resolve(response);
            if (result.text === '' || result.text === 'Nothing')
                return resolve(response);

                GM.xmlHttpRequest({
                    method: 'POST',
                    url: `https://prong-midi-shame.glitch.me/recipes`,
                    data: JSON.stringify({
                        first: {
                            text: first.text,
                            emoji: first.emoji,
                        },
                        second: {
                            text: second.text,
                            emoji: second.emoji,
                        },
                        result: {
                            text: result.text,
                            emoji: result.emoji,
                            isNew: result.discovered
                        },
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Origin: 'https://neal.fun/infinite-craft/',
                    },
                });
            addElementToCrafts({
                text: first.text,
                emoji: first.emoji,
            }, {
                text: second.text,
                emoji: second.emoji,
            }, result.text);
            if (result.discovered) {
                addElementToDiscoveries(result);
            }
            console.log(`${first.text} + ${second.text} = ${result.text}`);
            resolve(response);
        }), unsafeWindow);
        const selectElement = unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].selectElement;
        unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].selectElement = exportFunction((e, element) => {
            element = element.wrappedJSObject === undefined ? element : element.wrappedJSObject;
            if (e.button === 2) {
                openCraftsForElement(element);
                return;
            }
            if (e.altKey) {
                pinElement(element);
                return;
            }
            return selectElement(e, element);
        }, unsafeWindow);
        const instanceObserver = new MutationObserver((mutations) => {
            setMiddleClickOnMutations(mutations);
        });
        instanceObserver.observe(elements.instances, { childList: true, subtree: true });
        const oldResetButton = document.querySelector('.reset');
        const resetButton = oldResetButton.cloneNode(true);
        oldResetButton.parentNode?.replaceChild(resetButton, oldResetButton);
        resetButton.addEventListener('click', async () => {
            const confirmation = confirm('Are you sure? This will delete all your progress!');
            if (confirmation) {
                localStorage.removeItem('infinite-craft-data');
                await resetPinnedElements();
                await resetCrafts();
                location.reload();
            }
        });
    }

    function init$4(elements) {
        const uploadContainer = document.createElement('label');
        uploadContainer.setAttribute('for', 'import-save');
        uploadContainer.classList.add('setting');
        const uploadInput = document.createElement('input');
        uploadInput.type = 'file';
        uploadInput.id = 'import-save';
        uploadContainer.appendChild(uploadInput);
        const uploadText = document.createTextNode('Import Save File');
        uploadContainer.appendChild(uploadText);
        const uploadImage = document.createElement('img');
        uploadImage.src = uploadIcon.trim();
        uploadContainer.appendChild(uploadImage);
        elements.settingsContent.appendChild(uploadContainer);
        uploadInput.addEventListener('change', async () => {
            const file = uploadInput.files !== null ? uploadInput.files[0] : null;
            if (file === null || file.type !== 'application/json')
                return;
            const fileContents = JSON.parse(await file.text());
            if (!Object.keys(fileContents).includes('elements'))
                return;
            const saveFile = [];
            for (const element of fileContents.elements) {
                if (!Object.keys(element).includes('text'))
                    continue;
                const toPush = {
                    text: element.text,
                    discovered: !Object.keys(element).includes('discovered')
                        ? Object.keys(fileContents).includes('discoveries')
                            ? fileContents.discoveries.includes(element.text)
                            : false
                        : element.discovered,
                };
                if (Object.keys(element).includes('emoji'))
                    toPush.emoji = element.emoji;
                saveFile.push(toPush);
            }
            localStorage.setItem('infinite-craft-data', JSON.stringify({
                elements: saveFile,
            }));
            unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements = cloneInto(saveFile, unsafeWindow);
            await resetCrafts();
            if (Object.keys(fileContents).includes('recipes')) {
                for (const recipeKey of Object.keys(fileContents.recipes)) {
                    for (const recipe of fileContents.recipes[recipeKey]) {
                        addElementToCrafts({
                            text: recipe[0].text,
                            emoji: recipe[0].emoji,
                        }, {
                            text: recipe[1].text,
                            emoji: recipe[1].emoji,
                        }, recipeKey);
                    }
                }
            }
            await resetDiscoveries();
            const discoveredElements = cloneInto(unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements, unsafeWindow).filter((el) => el.discovered === true);
            for (const discoveredElement of discoveredElements) {
                addElementToDiscoveries(discoveredElement);
            }
            await resetPinnedElements();
            if (Object.keys(fileContents).includes('pinned')) {
                for (let pinnedElement of fileContents.pinned) {
                    pinElement(cloneInto(pinnedElement, unsafeWindow));
                }
            }
        });
        const downloadContainer = document.createElement('div');
        downloadContainer.classList.add('setting');
        const downloadText = document.createTextNode('Export Save File');
        downloadContainer.appendChild(downloadText);
        const downloadImage = document.createElement('img');
        downloadImage.src = downloadIcon.trim();
        downloadContainer.appendChild(downloadImage);
        elements.settingsContent.appendChild(downloadContainer);
        downloadContainer.addEventListener('click', (e) => {
            const saveFile = JSON.parse(localStorage.getItem('infinite-craft-data') ?? '');
            saveFile.pinned = pinnedElements;
            saveFile.recipes = recipes;
            const downloadLink = document.createElement('a');
            downloadLink.download = 'infinitecraft.json';
            downloadLink.href = URL.createObjectURL(new Blob([JSON.stringify(saveFile, null, '\t')], {
                type: 'application/json',
            }));
            downloadLink.dataset.downloadurl = ['application/json', downloadLink.download, downloadLink.href].join(':');
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            setTimeout(function () {
                URL.revokeObjectURL(downloadLink.href);
            }, 1500);
        });
    }

    /**
     * The MIT License (MIT)
     *
     * Copyright (c) 2015 Marin Atanasov
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    const characterMap = {
        À: 'A',
        Á: 'A',
        Â: 'A',
        Ã: 'A',
        Ä: 'A',
        Å: 'A',
        Ấ: 'A',
        Ắ: 'A',
        Ẳ: 'A',
        Ẵ: 'A',
        Ặ: 'A',
        Æ: 'AE',
        Ầ: 'A',
        Ằ: 'A',
        Ȃ: 'A',
        Ả: 'A',
        Ạ: 'A',
        Ẩ: 'A',
        Ẫ: 'A',
        Ậ: 'A',
        Ç: 'C',
        Ḉ: 'C',
        È: 'E',
        É: 'E',
        Ê: 'E',
        Ë: 'E',
        Ế: 'E',
        Ḗ: 'E',
        Ề: 'E',
        Ḕ: 'E',
        Ḝ: 'E',
        Ȇ: 'E',
        Ẻ: 'E',
        Ẽ: 'E',
        Ẹ: 'E',
        Ể: 'E',
        Ễ: 'E',
        Ệ: 'E',
        Ì: 'I',
        Í: 'I',
        Î: 'I',
        Ï: 'I',
        Ḯ: 'I',
        Ȋ: 'I',
        Ỉ: 'I',
        Ị: 'I',
        Ð: 'D',
        Ñ: 'N',
        Ò: 'O',
        Ó: 'O',
        Ô: 'O',
        Õ: 'O',
        Ö: 'O',
        Ø: 'O',
        Ố: 'O',
        Ṍ: 'O',
        Ṓ: 'O',
        Ȏ: 'O',
        Ỏ: 'O',
        Ọ: 'O',
        Ổ: 'O',
        Ỗ: 'O',
        Ộ: 'O',
        Ờ: 'O',
        Ở: 'O',
        Ỡ: 'O',
        Ớ: 'O',
        Ợ: 'O',
        Ù: 'U',
        Ú: 'U',
        Û: 'U',
        Ü: 'U',
        Ủ: 'U',
        Ụ: 'U',
        Ử: 'U',
        Ữ: 'U',
        Ự: 'U',
        Ý: 'Y',
        à: 'a',
        á: 'a',
        â: 'a',
        ã: 'a',
        ä: 'a',
        å: 'a',
        ấ: 'a',
        ắ: 'a',
        ẳ: 'a',
        ẵ: 'a',
        ặ: 'a',
        æ: 'ae',
        ầ: 'a',
        ằ: 'a',
        ȃ: 'a',
        ả: 'a',
        ạ: 'a',
        ẩ: 'a',
        ẫ: 'a',
        ậ: 'a',
        ç: 'c',
        ḉ: 'c',
        è: 'e',
        é: 'e',
        ê: 'e',
        ë: 'e',
        ế: 'e',
        ḗ: 'e',
        ề: 'e',
        ḕ: 'e',
        ḝ: 'e',
        ȇ: 'e',
        ẻ: 'e',
        ẽ: 'e',
        ẹ: 'e',
        ể: 'e',
        ễ: 'e',
        ệ: 'e',
        ì: 'i',
        í: 'i',
        î: 'i',
        ï: 'i',
        ḯ: 'i',
        ȋ: 'i',
        ỉ: 'i',
        ị: 'i',
        ð: 'd',
        ñ: 'n',
        ò: 'o',
        ó: 'o',
        ô: 'o',
        õ: 'o',
        ö: 'o',
        ø: 'o',
        ố: 'o',
        ṍ: 'o',
        ṓ: 'o',
        ȏ: 'o',
        ỏ: 'o',
        ọ: 'o',
        ổ: 'o',
        ỗ: 'o',
        ộ: 'o',
        ờ: 'o',
        ở: 'o',
        ỡ: 'o',
        ớ: 'o',
        ợ: 'o',
        ù: 'u',
        ú: 'u',
        û: 'u',
        ü: 'u',
        ủ: 'u',
        ụ: 'u',
        ử: 'u',
        ữ: 'u',
        ự: 'u',
        ý: 'y',
        ÿ: 'y',
        Ā: 'A',
        ā: 'a',
        Ă: 'A',
        ă: 'a',
        Ą: 'A',
        ą: 'a',
        Ć: 'C',
        ć: 'c',
        Ĉ: 'C',
        ĉ: 'c',
        Ċ: 'C',
        ċ: 'c',
        Č: 'C',
        č: 'c',
        C̆: 'C',
        c̆: 'c',
        Ď: 'D',
        ď: 'd',
        Đ: 'D',
        đ: 'd',
        Ē: 'E',
        ē: 'e',
        Ĕ: 'E',
        ĕ: 'e',
        Ė: 'E',
        ė: 'e',
        Ę: 'E',
        ę: 'e',
        Ě: 'E',
        ě: 'e',
        Ĝ: 'G',
        Ǵ: 'G',
        ĝ: 'g',
        ǵ: 'g',
        Ğ: 'G',
        ğ: 'g',
        Ġ: 'G',
        ġ: 'g',
        Ģ: 'G',
        ģ: 'g',
        Ĥ: 'H',
        ĥ: 'h',
        Ħ: 'H',
        ħ: 'h',
        Ḫ: 'H',
        ḫ: 'h',
        Ĩ: 'I',
        ĩ: 'i',
        Ī: 'I',
        ī: 'i',
        Ĭ: 'I',
        ĭ: 'i',
        Į: 'I',
        į: 'i',
        İ: 'I',
        ı: 'i',
        Ĳ: 'IJ',
        ĳ: 'ij',
        Ĵ: 'J',
        ĵ: 'j',
        Ķ: 'K',
        ķ: 'k',
        Ḱ: 'K',
        ḱ: 'k',
        K̆: 'K',
        k̆: 'k',
        Ĺ: 'L',
        ĺ: 'l',
        Ļ: 'L',
        ļ: 'l',
        Ľ: 'L',
        ľ: 'l',
        Ŀ: 'L',
        ŀ: 'l',
        Ł: 'l',
        ł: 'l',
        Ḿ: 'M',
        ḿ: 'm',
        M̆: 'M',
        m̆: 'm',
        Ń: 'N',
        ń: 'n',
        Ņ: 'N',
        ņ: 'n',
        Ň: 'N',
        ň: 'n',
        ŉ: 'n',
        N̆: 'N',
        n̆: 'n',
        Ō: 'O',
        ō: 'o',
        Ŏ: 'O',
        ŏ: 'o',
        Ő: 'O',
        ő: 'o',
        Œ: 'OE',
        œ: 'oe',
        P̆: 'P',
        p̆: 'p',
        Ŕ: 'R',
        ŕ: 'r',
        Ŗ: 'R',
        ŗ: 'r',
        Ř: 'R',
        ř: 'r',
        R̆: 'R',
        r̆: 'r',
        Ȓ: 'R',
        ȓ: 'r',
        Ś: 'S',
        ś: 's',
        Ŝ: 'S',
        ŝ: 's',
        Ş: 'S',
        Ș: 'S',
        ș: 's',
        ş: 's',
        Š: 'S',
        š: 's',
        Ţ: 'T',
        ţ: 't',
        ț: 't',
        Ț: 'T',
        Ť: 'T',
        ť: 't',
        Ŧ: 'T',
        ŧ: 't',
        T̆: 'T',
        t̆: 't',
        Ũ: 'U',
        ũ: 'u',
        Ū: 'U',
        ū: 'u',
        Ŭ: 'U',
        ŭ: 'u',
        Ů: 'U',
        ů: 'u',
        Ű: 'U',
        ű: 'u',
        Ų: 'U',
        ų: 'u',
        Ȗ: 'U',
        ȗ: 'u',
        V̆: 'V',
        v̆: 'v',
        Ŵ: 'W',
        ŵ: 'w',
        Ẃ: 'W',
        ẃ: 'w',
        X̆: 'X',
        x̆: 'x',
        Ŷ: 'Y',
        ŷ: 'y',
        Ÿ: 'Y',
        Y̆: 'Y',
        y̆: 'y',
        Ź: 'Z',
        ź: 'z',
        Ż: 'Z',
        ż: 'z',
        Ž: 'Z',
        ž: 'z',
        ſ: 's',
        ƒ: 'f',
        Ơ: 'O',
        ơ: 'o',
        Ư: 'U',
        ư: 'u',
        Ǎ: 'A',
        ǎ: 'a',
        Ǐ: 'I',
        ǐ: 'i',
        Ǒ: 'O',
        ǒ: 'o',
        Ǔ: 'U',
        ǔ: 'u',
        Ǖ: 'U',
        ǖ: 'u',
        Ǘ: 'U',
        ǘ: 'u',
        Ǚ: 'U',
        ǚ: 'u',
        Ǜ: 'U',
        ǜ: 'u',
        Ứ: 'U',
        ứ: 'u',
        Ṹ: 'U',
        ṹ: 'u',
        Ǻ: 'A',
        ǻ: 'a',
        Ǽ: 'AE',
        ǽ: 'ae',
        Ǿ: 'O',
        ǿ: 'o',
        Þ: 'TH',
        þ: 'th',
        Ṕ: 'P',
        ṕ: 'p',
        Ṥ: 'S',
        ṥ: 's',
        X́: 'X',
        x́: 'x',
        Ѓ: 'Г',
        ѓ: 'г',
        Ќ: 'К',
        ќ: 'к',
        A̋: 'A',
        a̋: 'a',
        E̋: 'E',
        e̋: 'e',
        I̋: 'I',
        i̋: 'i',
        Ǹ: 'N',
        ǹ: 'n',
        Ồ: 'O',
        ồ: 'o',
        Ṑ: 'O',
        ṑ: 'o',
        Ừ: 'U',
        ừ: 'u',
        Ẁ: 'W',
        ẁ: 'w',
        Ỳ: 'Y',
        ỳ: 'y',
        Ȁ: 'A',
        ȁ: 'a',
        Ȅ: 'E',
        ȅ: 'e',
        Ȉ: 'I',
        ȉ: 'i',
        Ȍ: 'O',
        ȍ: 'o',
        Ȑ: 'R',
        ȑ: 'r',
        Ȕ: 'U',
        ȕ: 'u',
        B̌: 'B',
        b̌: 'b',
        Č̣: 'C',
        č̣: 'c',
        Ê̌: 'E',
        ê̌: 'e',
        F̌: 'F',
        f̌: 'f',
        Ǧ: 'G',
        ǧ: 'g',
        Ȟ: 'H',
        ȟ: 'h',
        J̌: 'J',
        ǰ: 'j',
        Ǩ: 'K',
        ǩ: 'k',
        M̌: 'M',
        m̌: 'm',
        P̌: 'P',
        p̌: 'p',
        Q̌: 'Q',
        q̌: 'q',
        Ř̩: 'R',
        ř̩: 'r',
        Ṧ: 'S',
        ṧ: 's',
        V̌: 'V',
        v̌: 'v',
        W̌: 'W',
        w̌: 'w',
        X̌: 'X',
        x̌: 'x',
        Y̌: 'Y',
        y̌: 'y',
        A̧: 'A',
        a̧: 'a',
        B̧: 'B',
        b̧: 'b',
        Ḑ: 'D',
        ḑ: 'd',
        Ȩ: 'E',
        ȩ: 'e',
        Ɛ̧: 'E',
        ɛ̧: 'e',
        Ḩ: 'H',
        ḩ: 'h',
        I̧: 'I',
        i̧: 'i',
        Ɨ̧: 'I',
        ɨ̧: 'i',
        M̧: 'M',
        m̧: 'm',
        O̧: 'O',
        o̧: 'o',
        Q̧: 'Q',
        q̧: 'q',
        U̧: 'U',
        u̧: 'u',
        X̧: 'X',
        x̧: 'x',
        Z̧: 'Z',
        z̧: 'z',
        й: 'и',
        Й: 'И',
        ё: 'е',
        Ё: 'Е',
    };
    const removeAccentsRegex = new RegExp(Object.keys(characterMap).join('|'), 'g');
    function removeAccents(string) {
        return string.replace(removeAccentsRegex, (char) => {
            return characterMap[char];
        });
    }
    const rankings = {
        CASE_SENSITIVE_EQUAL: 7,
        EQUAL: 6,
        STARTS_WITH: 5,
        WORD_STARTS_WITH: 4,
        CONTAINS: 3,
        ACRONYM: 2,
        MATCHES: 1,
        NO_MATCH: 0,
    };
    const defaultBaseSortFn = (a, b) => String(a.rankedValue).localeCompare(String(b.rankedValue));
    function matchSorter(items, value, options = {}) {
        const { keys, threshold = rankings.MATCHES, baseSort = defaultBaseSortFn, sorter = (matchedItems) => matchedItems.sort((a, b) => sortRankedValues(a, b, baseSort)), } = options;
        const matchedItems = items.reduce(reduceItemsToRanked, []);
        return sorter(matchedItems).map(({ item }) => item);
        function reduceItemsToRanked(matches, item, index) {
            const rankingInfo = getHighestRanking(item, keys, value, options);
            const { rank, keyThreshold = threshold } = rankingInfo;
            if (rank >= keyThreshold) {
                matches.push({ ...rankingInfo, item, index });
            }
            return matches;
        }
    }
    matchSorter.rankings = rankings;
    function getHighestRanking(item, keys, value, options) {
        if (!keys) {
            const stringItem = item;
            return {
                rankedValue: stringItem,
                rank: getMatchRanking(stringItem, value, options),
                keyIndex: -1,
                keyThreshold: options.threshold,
            };
        }
        const valuesToRank = getAllValuesToRank(item, keys);
        return valuesToRank.reduce(({ rank, rankedValue, keyIndex, keyThreshold }, { itemValue, attributes }, i) => {
            let newRank = getMatchRanking(itemValue, value, options);
            let newRankedValue = rankedValue;
            const { minRanking, maxRanking, threshold } = attributes;
            if (newRank < minRanking && newRank >= rankings.MATCHES) {
                newRank = minRanking;
            }
            else if (newRank > maxRanking) {
                newRank = maxRanking;
            }
            if (newRank > rank) {
                rank = newRank;
                keyIndex = i;
                keyThreshold = threshold;
                newRankedValue = itemValue;
            }
            return { rankedValue: newRankedValue, rank, keyIndex, keyThreshold };
        }, {
            rankedValue: item,
            rank: rankings.NO_MATCH,
            keyIndex: -1,
            keyThreshold: options.threshold,
        });
    }
    function getMatchRanking(testString, stringToRank, options) {
        testString = prepareValueForComparison(testString, options);
        stringToRank = prepareValueForComparison(stringToRank, options);
        if (stringToRank.length > testString.length) {
            return rankings.NO_MATCH;
        }
        if (testString === stringToRank) {
            return rankings.CASE_SENSITIVE_EQUAL;
        }
        testString = testString.toLowerCase();
        stringToRank = stringToRank.toLowerCase();
        if (testString === stringToRank) {
            return rankings.EQUAL;
        }
        if (testString.startsWith(stringToRank)) {
            return rankings.STARTS_WITH;
        }
        if (testString.includes(` ${stringToRank}`)) {
            return rankings.WORD_STARTS_WITH;
        }
        if (testString.includes(stringToRank)) {
            return rankings.CONTAINS;
        }
        else if (stringToRank.length === 1) {
            return rankings.NO_MATCH;
        }
        if (getAcronym(testString).includes(stringToRank)) {
            return rankings.ACRONYM;
        }
        return getClosenessRanking(testString, stringToRank);
    }
    function getAcronym(string) {
        let acronym = '';
        const wordsInString = string.split(' ');
        for (const wordInString of wordsInString) {
            const splitByHyphenWords = wordInString.split('-');
            for (const splitByHyphenWord of splitByHyphenWords) {
                acronym += splitByHyphenWord.substr(0, 1);
            }
        }
        return acronym;
    }
    function getClosenessRanking(testString, stringToRank) {
        let matchingInOrderCharCount = 0;
        let charNumber = 0;
        function findMatchingCharacter(matchChar, string, index) {
            for (let j = index, J = string.length; j < J; j++) {
                const stringChar = string[j];
                if (stringChar === matchChar) {
                    matchingInOrderCharCount += 1;
                    return j + 1;
                }
            }
            return -1;
        }
        function getRanking(spread) {
            const spreadPercentage = 1 / spread;
            const inOrderPercentage = matchingInOrderCharCount / stringToRank.length;
            const ranking = rankings.MATCHES + inOrderPercentage * spreadPercentage;
            return ranking;
        }
        const firstIndex = findMatchingCharacter(stringToRank[0], testString, 0);
        if (firstIndex < 0) {
            return rankings.NO_MATCH;
        }
        charNumber = firstIndex;
        for (let i = 1, I = stringToRank.length; i < I; i++) {
            const matchChar = stringToRank[i];
            charNumber = findMatchingCharacter(matchChar, testString, charNumber);
            const found = charNumber > -1;
            if (!found) {
                return rankings.NO_MATCH;
            }
        }
        const spread = charNumber - firstIndex;
        return getRanking(spread);
    }
    function sortRankedValues(a, b, baseSort) {
        const aFirst = -1;
        const bFirst = 1;
        const { rank: aRank, keyIndex: aKeyIndex } = a;
        const { rank: bRank, keyIndex: bKeyIndex } = b;
        const same = aRank === bRank;
        if (same) {
            if (aKeyIndex === bKeyIndex) {
                return baseSort(a, b);
            }
            else {
                return aKeyIndex < bKeyIndex ? aFirst : bFirst;
            }
        }
        else {
            return aRank > bRank ? aFirst : bFirst;
        }
    }
    function prepareValueForComparison(value, { keepDiacritics }) {
        value = `${value}`;
        if (!keepDiacritics) {
            value = removeAccents(value);
        }
        return value;
    }
    function getItemValues(item, key) {
        if (typeof key === 'object') {
            key = key.key;
        }
        let value;
        if (typeof key === 'function') {
            value = key(item);
        }
        else if (item == null) {
            value = null;
        }
        else if (Object.hasOwn(item, key)) {
            value = item[key];
        }
        else if (key.includes('.')) {
            return getNestedValues(key, item);
        }
        else {
            value = null;
        }
        if (value == null) {
            return [];
        }
        if (Array.isArray(value)) {
            return value;
        }
        return [String(value)];
    }
    function getNestedValues(path, item) {
        const keys = path.split('.');
        let values = [item];
        for (let i = 0, I = keys.length; i < I; i++) {
            const nestedKey = keys[i];
            let nestedValues = [];
            for (let j = 0, J = values.length; j < J; j++) {
                const nestedItem = values[j];
                if (nestedItem == null)
                    continue;
                if (Object.hasOwn(nestedItem, nestedKey)) {
                    const nestedValue = nestedItem[nestedKey];
                    if (nestedValue != null) {
                        nestedValues.push(nestedValue);
                    }
                }
                else if (nestedKey === '*') {
                    nestedValues = nestedValues.concat(nestedItem);
                }
            }
            values = nestedValues;
        }
        if (Array.isArray(values[0])) {
            const result = [];
            return result.concat(...values);
        }
        return values;
    }
    function getAllValuesToRank(item, keys) {
        const allValues = [];
        for (let j = 0, J = keys.length; j < J; j++) {
            const key = keys[j];
            const attributes = getKeyAttributes(key);
            const itemValues = getItemValues(item, key);
            for (let i = 0, I = itemValues.length; i < I; i++) {
                allValues.push({
                    itemValue: itemValues[i],
                    attributes,
                });
            }
        }
        return allValues;
    }
    const defaultKeyAttributes = {
        maxRanking: Infinity,
        minRanking: -Infinity,
    };
    function getKeyAttributes(key) {
        if (typeof key === 'string') {
            return defaultKeyAttributes;
        }
        return { ...defaultKeyAttributes, ...key };
    }

    function init$3(elements) {
        elements.sidebarHeader.prepend(elements.searchBar);
        window.addEventListener('keydown', () => {
            if (document.activeElement !== elements.searchBar) {
                elements.searchBar.focus();
            }
        });
        elements.searchBar.addEventListener('input', (e) => {
            if (e.inputType === 'insertText' &&
                unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.searchQuery.trim().length === 1) {
                elements.sidebar.scrollTo(0, 0);
            }
        });
        unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._computedWatchers.sortedElements.getter =
            exportFunction(() => {
                const query = unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.searchQuery.trim();
                if (query === '') {
                    const elements = [...unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements];
                    if (unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.showDiscoveredOnly) {
                        return cloneInto(elements.filter((el) => el.discovered), unsafeWindow);
                    }
                    if (unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.sortBy === 'name') {
                        return cloneInto(elements, unsafeWindow).sort((a, b) => a.text.localeCompare(b.text));
                    }
                    if (unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.sortBy === 'emoji') {
                        return cloneInto(elements, unsafeWindow).sort((a, b) => {
                            const emojiA = a.emoji ?? '⬜';
                            const emojiB = b.emoji ?? '⬜';
                            return emojiA.localeCompare(emojiB);
                        });
                    }
                    return unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements;
                }
                else {
                    return cloneInto(matchSorter(cloneInto(unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements, unsafeWindow), unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.searchQuery, {
                        keys: ['text'],
                    }), unsafeWindow);
                }
            }, unsafeWindow);
    }

    function init$2(elements) {
        const randomImage = document.createElement('img');
        randomImage.src = randomIcon.trim();
        randomImage.classList.add('random');
        elements.sideControls.appendChild(randomImage);
        randomImage.addEventListener('click', (e) => {
            unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].playInstanceSound();
            const randomElement = unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements[Math.floor(Math.random() * unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements.length)];
            const data = {
                id: unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.instanceId++,
                text: randomElement.text,
                emoji: randomElement.emoji,
                discovered: randomElement.discovered,
                disabled: false,
                left: 0,
                top: 0,
                offsetX: 0.5,
                offsetY: 0.5,
            };
            unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.selectedInstance = cloneInto(data, unsafeWindow);
            unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.instances.push(unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.selectedInstance);
            unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].$nextTick(exportFunction(() => {
                const randomPosition = Math.random() * Math.PI * 2;
                const cos = 50 * Math.cos(randomPosition);
                const sin = 50 * Math.sin(randomPosition);
                unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].setInstancePosition(unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.selectedInstance, (window.innerWidth - unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.sidebarSize) / 2 +
                    cos, window.innerHeight / 2 - 40 + sin);
                unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].setInstanceZIndex(unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.selectedInstance, data.id);
                unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].calcInstanceSize(unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.selectedInstance);
            }, unsafeWindow));
        });
    }

    let theme = 'light';
    const darkCSS = `
	:root {
		--base: #18181b !important;
        --border: #525252 !important;
        --border-hover: #91a8c1 !important;
        --text: #fff !important;
		--selected-gradient: linear-gradient(0deg,#3b0764,#18181b 90%) !important;
	}

	* {
		scrollbar-color: #525252 #262626;
	}

	.settings-button, .setting > img, .site-title, .logo, .coffee-link, .clear, .sound, .random, .discoveries-icon, .close-button, .sort-img, .particles, .instruction-icon, .sidebar-sorting-icon, .instance-discovered-emoji {
        filter: invert(1) !important;
    }

	.reset, .sort, .sidebar-sorting-item {
		color: var(--text) !important;
	}

	.particles {
		background-color: #e7e7e4 !important;
	}

	.sidebar, .items, .item, .mobile-sound, .sidebar-sorting-item {
		background-color: var(--base) !important;
	}

	.item, .mobile-sound, .sidebar-sorting {
		border-color: var(--border) !important;
	}

	.item, .instruction {
		color: var(--text) !important;

	}
	.item:hover {
        background: var(--selected-gradient) !important;
        border: 1px solid var(--border-hover) !important;
    }

	.instance {
		background: linear-gradient(0deg, #170326, #18181b 70%) !important;
	}

	.sidebar-sorting {
		background-color: var(--border) !important;
	}

	.sidebar-discoveries-active {
		background-color: #262626 !important;
	}
`;
    const darkStyles = document.createElement('style');
    darkStyles.appendChild(document.createTextNode(darkCSS.trim()));
    function init$1(elements) {
        theme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
        if (localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', theme);
        }
        const themeContainer = document.createElement('div');
        themeContainer.classList.add('setting');
        const themeText = document.createTextNode('Toggle Theme');
        themeContainer.appendChild(themeText);
        const themeImage = document.createElement('img');
        if (theme === 'light') {
            themeImage.src = lightmode.trim();
        }
        else {
            themeImage.src = darkmode.trim();
            document.getElementsByTagName('head')[0].appendChild(darkStyles);
        }
        themeContainer.appendChild(themeImage);
        elements.settingsContent.appendChild(themeContainer);
        themeContainer.addEventListener('click', (e) => {
            if (theme === 'dark') {
                theme = 'light';
                themeImage.src = lightmode.trim();
                darkStyles.remove();
            }
            else {
                theme = 'dark';
                themeImage.src = darkmode.trim();
                document.getElementsByTagName('head')[0].appendChild(darkStyles);
            }
            localStorage.setItem('theme', theme);
        });
    }

    function init(elements) {
        elements.logo.src = logo.trim();
        const versionNumber = document.createElement('p');
        versionNumber.appendChild(document.createTextNode(`v${GM.info.script.version}`));
        versionNumber.classList.add('version');
        elements.logo.after(versionNumber);
    }

    window.addEventListener('load', async () => {
        const sidebarHeader = document.createElement('div');
        sidebarHeader.classList.add('sidebar-header');
        const settingsContent = document.createElement('div');
        settingsContent.classList.add('settings-content');
        const elements = {
            container: document.querySelector('.container'),
            instances: document.querySelector('.instances'),
            styles: document.createElement('style'),
            sideControls: document.querySelector('.side-controls'),
            sidebar: document.querySelector('.sidebar'),
            sidebarHeader: sidebarHeader,
            searchBar: document.querySelector('.sidebar-input'),
            settingsContent: settingsContent,
            items: document.querySelector('.items'),
            getItems: () => {
                return Array.from(document.querySelectorAll('.items div.item'));
            },
            instruction: document.querySelector('.instruction'),
            sort: document.querySelector('.sort'),
            particles: document.querySelector('.particles'),
            logo: document.querySelector('.logo'),
        };
        elements.items.before(elements.sidebarHeader);
        init$a(elements);
        init$5(elements);
        init$7(elements);
        init$4(elements);
        init$3(elements);
        init$6(elements);
        init$2(elements);
        await init$9(elements);
        init$8(elements);
        init$1(elements);
        init(elements);

	    console.log('hi')
    }, false);
    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

})();
