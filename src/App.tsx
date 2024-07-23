import { Button, Input, Switch } from "@nextui-org/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";

function App() {

  const [upper, SetUpper] = useState<boolean>(true);
  const [lower, SetLower] = useState<boolean>(true);
  const [num, SetNum] = useState<boolean>(true);
  const [sym, SetSym] = useState<boolean>(true);
  const [len, SetLen] = useState<string>("");
    const [pass, SetPass] = useState<string>("");

  function generate() {
    if(! (upper || lower || num || sym)){
      toast.error("Select anyone");
      SetPass("");
      return;
    }
    let length = parseInt(len)
    if (length != 0) {
      let charset = "";
      if (upper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (lower) charset += "abcdefghijklmnopqrstuvwxyz";
      if (num) charset += "0123456789";
      if (sym) charset += "!@#$%^&*()_+-=<>.,?:;{}[]|";

      let genpass = "";
      for (let i = 0; i < length; i++) {
        const ranind = Math.floor(Math.random() * charset.length);
        genpass += charset[ranind];
      }
      console.log(genpass);
      SetPass(genpass);
    }
  }

  return (
    <>
      <div>
        <div className="flex justify-center items-center h-dvh bg-gradient-to-b from-slate-200 to-slate-300">
          <div className="w-full mx-3 md:w-1/2 lg:w-1/4">
            <h1 className="text-blue-500 text-xl font-bold my-5">
              Password-Generator
            </h1>

            <Input
              variant="faded"
              placeholder="Password Length"
              type="number"
              color="primary"
              className="my-4 font-bold"
              onKeyDown={(e) => e.key === "Enter" && generate()}
              value={len}
              onChange={(e: any) => SetLen(e.target.value)}
            />

            <div className="space-y-4 my-8 px-12 font-semibold">
              <div className="flex gap-4 justify-between">
                <p>Uppercase : </p>
                <Switch
                  isSelected={upper}
                  onValueChange={() => SetUpper(!upper)}
                  size="sm"
                ></Switch>
              </div>
              <div className="flex gap-4 justify-between">
                <p>Lowercase : </p>
                <Switch
                  isSelected={lower}
                  onValueChange={() => SetLower(!lower)}
                  size="sm"
                ></Switch>
              </div>
              <div className="flex gap-4 justify-between">
                <p>Numbers : </p>
                <Switch
                  isSelected={num}
                  onValueChange={() => SetNum(!num)}
                  size="sm"
                ></Switch>
              </div>
              <div className="flex gap-4 justify-between">
                <p>Symbols : </p>
                <Switch
                  isSelected={sym}
                  onValueChange={() => SetSym(!sym)}
                  size="sm"
                ></Switch>
              </div>
            </div>

            <div className="text-center">
              <Button
                className="text-blue-600 font-semibold bg-blue-200 border-2 border-blue-600"
                onPress={generate}
              >
                Generate
              </Button>
            </div>

            <div className="flex gap-3 items-center justify-between bg-slate-50 px-3 rounded-lg py-2 my-8 mx-3">
              <input
                type="text"
                className="w-full bg-transparent rounded-lg border-none"
                placeholder="Generated Password"
                readOnly
                value={pass}
              />
                <FaRegCopy className="cursor-pointer text-blue-500" onClick={()=>(navigator.clipboard.writeText(pass), toast.success("copied"))} />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App
