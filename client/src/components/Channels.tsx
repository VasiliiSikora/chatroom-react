import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export interface channel {
    _id: number,
    channelname: String,
    message: string,
    users: string[]
}

// https://bobbyhadz.com/blog/react-typescript-pass-function-as-prop#:~:text=To%20pass%20a%20function%20as,prop%20to%20the%20child%20component.
interface ChannelProps {
    channels: channel[],
    changeChat: (channel: channel) => void
}

// https://stackoverflow.com/questions/55075740/property-does-not-exist-on-type-intrinsicattributes
export function Channels({channels, changeChat}: ChannelProps) {

    const [currentChannel, setCurrentChannel] = useState<channel | undefined>(undefined);
    const [currentSelected, setCurrentSelected] = useState<Number | undefined>(undefined);

    const changeCurrentChat = (index: Number, channel: channel) => {
        setCurrentSelected(index);
        changeChat(channel)
    }

    return (
        <>
        <Container>
          <div className="brand">
            <h3>Chatroom</h3>
          </div>
          <div className="contacts">
            {channels.map((channel, index) => {
              return (
                <div
                  key={channel._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, channel)}
                >
                  <div className="channelname">
                    <h3>{channel.channelname}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
    </>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;