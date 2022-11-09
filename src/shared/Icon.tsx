import { defineComponent, PropType } from "vue";
import s from "./Icon.module.scss";
// interface Props {
//   name: string;
// }
export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
    onClick: {
      type: Function as PropType<(e: Event) => void>,
    },
  },
  setup: (props, context) => {
    return () => (
      <svg class={s.icon} onClick={props.onClick}>
        <use xlinkHref={"#" + props.name}></use>
      </svg>
    );
  },
});
