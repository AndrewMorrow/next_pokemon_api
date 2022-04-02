import { Dialog, Transition } from "@headlessui/react";
import { getSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { prisma } from "../src/prismaConnect";

export default function TeamModal(props: {
  modalIsOpen: boolean;
  setModalIsOpen: Function;
  session: any;
  userTeams?: any;
  setTeamSelected: Function;
}) {
  // let [isOpen, setIsOpen] = useState(props.modalIsOpen);

  function closeModal() {
    props.setModalIsOpen(false);
  }

  const handleTeamSelect = async (teamName: string) => {
    props.setTeamSelected(teamName);
    closeModal();
  };

  return (
    <>
      <Transition appear show={props.modalIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add to Team
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Which team would you like to add this pokemon to?
                  </p>
                </div>

                <div className="mt-4 flex-col sm:flex flex-wrap gap-4">
                  {props.userTeams?.teams?.map((team: any) => (
                    <button
                      key={team.id}
                      className="shadow-md rounded-md"
                      onClick={() => handleTeamSelect(team.name)}
                    >
                      <h1 className=" justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300">
                        {team.name}
                      </h1>
                    </button>
                  ))}
                  {/* <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button> */}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
