import TextInput from "../input/text/textInput";
import TextArea from "../input/textArea/textAreaInput";
import Text from "../typography/typography";
import style from "./write.module.css";

interface WriteComponentPropsType {
  headValue: string;
  subHeadValue: string;
  bodyValue: string;
  onChange: (e: any) => void;
}

const Write = ({
  headValue,
  subHeadValue,
  bodyValue,
  onChange,
}: WriteComponentPropsType) => {
  return (
    <div className={style.holder}>
      <div className={style.head}>
        <Text>Headline</Text>
        <TextInput
          className={style.headInput}
          onChange={onChange}
          value={headValue}
          testId="writeComponentHeadInput"
          type="text"
          name="headInput"
        />
      </div>

      <div className={style.middle}>
        <Text>Description</Text>
        <TextInput
          className={style.subHeadInput}
          onChange={onChange}
          value={subHeadValue}
          testId="writeComponentSubHeadInput"
          type="text"
          name="subHeadInput"
        />
      </div>

      <div className={style.bottom}>
        <Text>Body</Text>
        <TextArea
          className={style.bodyInput}
          onChange={onChange}
          value={bodyValue}
          testId="writeComponentBodyInput"
          name="bodyInput"
        />
      </div>
    </div>
  );
};

export default Write;
