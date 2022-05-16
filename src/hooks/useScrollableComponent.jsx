const useScrollableComponent = () => {
    let scrollTargetRef;

    const scrollToTarget = () => {
        scrollTargetRef.scrollIntoView({ behavior: "smooth" });
    };

    const TargetComponent = () => <div ref={scrollTargetRef} />;

    return [scrollToTarget, TargetComponent];
};

export default useScrollableComponent;
