<?php get_header(); ?>

<main class="yadixa-page">
    <div class="yadixa-container">

        <?php
        while (have_posts()) :
            the_post();
        ?>

            <h1 class="yadixa-page-title">
                <?php the_title(); ?>
            </h1>

            <div class="yadixa-page-content">
                <?php the_content(); ?>
            </div>

        <?php endwhile; ?>

    </div>
</main>

<?php get_footer(); ?>