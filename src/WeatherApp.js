"use strict";
// eslint-disable-next-line no-unused-vars
import { mapToStyles } from "@popperjs/core/lib/modifiers/computeStyles";
import { staticRenderer } from "./UIManager";
import { eventManager } from "./EventManager";
import "./styles/style.scss";

staticRenderer.setup();
eventManager.setup();
