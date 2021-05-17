import React from "react";
import { render } from "@testing-library/react";
import SocialNetworksItem from "./SocialNetworksItem";


test("Is SocialNetworksItem link have correct id", () => {
    const { getByTestId } = render(
        <SocialNetworksItem id="test-id" />
    )

    const link = getByTestId("socialNetworksLink");
    expect(link.id).toBe("test-id");
})

test("Is SocialNetworksItem link have correct class-name", () => {
    const { getByTestId } = render(
        <SocialNetworksItem className="test"/>
    )

    const link = getByTestId("socialNetworksLink");
    expect(link.className).toBe("test-link");
})

test("Is SocialNetworksItem img get correct src", () => {
    const { getByTestId } = render(
        <SocialNetworksItem src="/test/img"/>
    )

    const img = getByTestId("socialNetworksImg");
    expect(img.src).toBe("http://localhost/test/img");
})