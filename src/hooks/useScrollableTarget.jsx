export function useScrollableTarget() {
    let scrollTargetRef;

    const scroll = () => {
        scrollTargetRef.scrollIntoView({ behavior: "smooth" });
    };

    const TargetComponent = () => <div ref={scrollTargetRef} />;

    return [scroll, TargetComponent];
}