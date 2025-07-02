<script lang='ts'>
    import UserCard from "$lib/components/UserCard.svelte";

    let scrollContainer: HTMLElement;
    let isDown = $state(false);
    let startX = $state(0);
    let scrollLeft = $state(0);

    // const onMouseDown = (e: MouseEvent) => {
    //     isDown = true;
    //     scrollContainer.classList.add('cursor-grabbing');
    //     startX = e.pageX - scrollContainer.offsetLeft;
    //     scrollLeft = scrollContainer.scrollLeft;
    // }

    // const onMouseLeave = () => {
    //     isDown = false;
    //     scrollContainer.classList.remove('cursor-grabbing');
    // }

    // const onMouseUp = () => {
    //     isDown = false;
    //     scrollContainer.classList.remove('cursor-grabbing');
    // }

    // const onMouseMove = (e: MouseEvent) => {
    //     if (!isDown) return;
    //     e.preventDefault();
    //     const x = e.pageX - scrollContainer.offsetLeft;
    //     const walk = (x - startX) * 1.5 // Scroll Speed
    //     scrollContainer.scrollLeft = scrollLeft - walk;
    // }
</script>

<div class='flex flex-col gap-10'>
    <section class='flex flex-row justify-between'>
        <h1 class='text-3xl'>Users near you</h1>
        <div class='flex flex-row items-center justify-center'>
            <div class='w-10'>
                <img src="/icons/Tune.png" alt="">
            </div>
            <span>Filter</span>
        </div>
    </section>
    <div 
        class='w-full flex flex-row gap-10 overflow-x-auto'
    >
        <!-- <UserCard age={20} handicap_index={10.9} member="Capilano Gold and Country Club" name="Justin Han" src="/images/example1.jpg"/>
        <UserCard age={43} handicap_index={7.2} member="Beacon Hall Golf Club" name="Megan Butcher" src="/images/example2.jpg"/>
        <UserCard age={32} handicap_index={15.2} member="Bigwin Island Golf Club" name="Jeffery Turner" src="/images/example3.jpg"/>
        <UserCard age={48} handicap_index={13.5} member="The Pulpit Club" name="Austin Evans" src="/images/example4.jpg"/>
        <UserCard age={27} handicap_index={12.2} member="Bigwin Island Golf Club" name="Peter Franks" src="/images/example5.jpg"/>
        <UserCard age={21} handicap_index={15.2} member="Coppinwood Golf Club" name="George Makenna" src="/images/example6.jpg"/> -->
    </div>
    <section>
        <h1 class="text-3xl">Trending in Golf</h1>
    </section>

</div>