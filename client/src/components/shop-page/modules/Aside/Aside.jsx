import React, { useContext, useEffect, useState } from "react";
import styles from "./Aside.module.css";
import { Button } from "../../../ui/";
import { ShopFilterList } from "../../";
import { Context } from "../../../../";
import { observer } from "mobx-react-lite";
import cn from "classnames";
import { ENTITY_TYPES } from "../../../../utils/consts";

const Aside = observer(({ className }) => {
  const { products } = useContext(Context);
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    ENTITY_TYPES.forEach((t) => {
      if (t.endpoint !== "Type") {
        setData((prev) => ({ ...prev, [t.filter]: [] }));
      }
    });
  }, [refresh]);

  const sendRequest = () => {
    if (data) {
      ENTITY_TYPES.forEach((t) => {
        if (t.endpoint !== "Type") {
          products[t.setSelected](data[t.filter].join("-"));
        }
      });
    }
  };

  const onChange = (filterType, item) => {
    setData((prev) => ({ ...prev, [filterType]: item }));
  };

  return (
    <aside className={cn(className, styles.item_container)}>
      {ENTITY_TYPES.map(
        (type) =>
          type.endpoint !== "Type" &&
          products[type.getter].length > 1 && (
            <ShopFilterList
              refresh={refresh}
              key={type.id}
              list={type.getter}
              label={type.label}
              filterType={type.filter}
              onChange={onChange}
            />
          ),
      )}
      <Button appearance="danger" onClick={() => setRefresh(!refresh)}>
        Сбросить
      </Button>
      <Button appearance="primary" onClick={sendRequest}>
        Применить
      </Button>
    </aside>
  );
});

export default Aside;
