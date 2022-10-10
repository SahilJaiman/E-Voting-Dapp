import { Button, Dropdown, Link, Navbar, Switch, Text, useTheme } from '@nextui-org/react';
import React from 'react';
import { icons } from './icons.tsx';
import { AcmeLogo } from './logo.tsx';
import { GithubIcon } from '../icons/GithubIcon.tsx'
import { useEffect, useState } from "react";
import { connectWallet, getAccount } from "../../utils/wallet";
import { SunIcon } from './SunIcon';
import { MoonIcon } from './MoonIcon';
import useDarkMode from 'use-dark-mode';


export const Nav = () => {

    const darkMode = useDarkMode(false);
    const [account, setAccount] = useState("");

    useEffect(() => {
        (async () => {
            const activeAccount = await getAccount();
            setAccount(activeAccount);
        })();
    }, []);

    const onConnectWallet = async () => {
        await connectWallet();
        const activeAccount = await getAccount();
        setAccount(activeAccount);
        window.location.reload(false);
    };


    const collapseItems = [

    ];
    return (
        <Navbar
            isBordered
            variant={"sticky"}
            maxWidth={"fluid"}

        >
            <Navbar.Toggle showIn="xs" />
            <Navbar.Brand

            >
                <AcmeLogo />
                <Text b color="inherit">
                    Blockvote
                </Text>
            </Navbar.Brand>
            <Navbar.Content
                enableCursorHighlight
                activeColor="secondary"
                hideIn="xs"
                variant="highlight-rounded"

            >
                <Navbar.Link isActive href="#">Home</Navbar.Link>

            </Navbar.Content>

            <Navbar.Collapse >
                {collapseItems.map((item, index) => (
                    <Navbar.CollapseItem key={item}>
                        <Link
                            color="inherit"
                            css={{
                                minWidth: '100%',
                            }}
                            href="#"
                        >
                            {item}
                        </Link>
                    </Navbar.CollapseItem>
                ))}
                <Navbar.CollapseItem>
                    <Link
                        color="inherit"
                        css={{
                            minWidth: '100%',
                        }}
                        target="_blank"
                        href="https://github.com/SahilJaiman/E-Voting-Dapp"
                    >
                        <GithubIcon />
                    </Link>
                </Navbar.CollapseItem>
                <Navbar.CollapseItem>
                    <Switch
                        checked={darkMode.value}
                        onChange={() => darkMode.toggle()}
                        iconOn={<SunIcon filled />}
                        iconOff={<MoonIcon filled />}
                    />
                </Navbar.CollapseItem>
            </Navbar.Collapse>
            <Navbar.Content>
                <Button bordered color="primary" auto
                onPress={onConnectWallet}
                >
                 {account !== "" ? account : "Connect Wallet"}   
                </Button>




                <Navbar.Item hideIn={'xs'}>
                    <Link
                        color="inherit"
                        css={{
                            minWidth: '100%',
                        }}
                        target="_blank"
                        href="https://github.com/SahilJaiman/E-Voting-Dapp"
                    >
                        <GithubIcon />
                    </Link>
                </Navbar.Item>
                <Navbar.Item hideIn={'xs'}>
                    <Switch
                        checked={darkMode.value}
                        onChange={() => darkMode.toggle()}
                        iconOn={<SunIcon filled />}
                        iconOff={<MoonIcon filled />}
                    />
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    );
};